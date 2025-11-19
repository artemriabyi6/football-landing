import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Очікуємо параметри
    const { id } = await params
    const applicationId = parseInt(id)
    
    const body = await request.json()
    const { status } = body

    console.log(`Updating application ${applicationId} to status: ${status}`)

    if (!status || !['pending', 'approved', 'rejected'].includes(status)) {
      return NextResponse.json(
        { error: 'Невірний статус' },
        { status: 400 }
      )
    }

    // Перевіряємо чи існує заявка
    const existingApplication = await prisma.application.findUnique({
      where: { id: applicationId }
    })

    if (!existingApplication) {
      return NextResponse.json(
        { error: 'Заявка не знайдена' },
        { status: 404 }
      )
    }

    const updatedApplication = await prisma.application.update({
      where: { id: applicationId },
      data: { status },
      include: {
        course: {
          select: {
            title: true
          }
        }
      }
    })

    console.log(`✅ Application ${applicationId} updated successfully`)

    return NextResponse.json(updatedApplication)
  } catch (error) {
    console.error('❌ Error updating application:', error)
    
    if (error instanceof Error) {
      console.error('Error details:', error.message)
    }
    
    return NextResponse.json(
      { error: 'Помилка при оновленні заявки' },
      { status: 500 }
    )
  }
}

// Додамо також GET для отримання конкретної заявки
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const applicationId = parseInt(id)

    const application = await prisma.application.findUnique({
      where: { id: applicationId },
      include: {
        course: {
          select: {
            title: true
          }
        }
      }
    })

    if (!application) {
      return NextResponse.json(
        { error: 'Заявка не знайдена' },
        { status: 404 }
      )
    }

    return NextResponse.json(application)
  } catch (error) {
    console.error('❌ Error fetching application:', error)
    return NextResponse.json(
      { error: 'Помилка при отриманні заявки' },
      { status: 500 }
    )
  }
}