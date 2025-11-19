import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'
import { ApplicationData } from '@/src/types'

export async function GET() {
  try {
    console.log('=== FETCHING APPLICATIONS ===')
    
    const applications = await prisma.application.findMany({
      include: {
        course: {
          select: {
            title: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    console.log(`✅ Found ${applications.length} applications`)
    
    return NextResponse.json(applications)
  } catch (error) {
    console.error('❌ Error fetching applications:', error)
    return NextResponse.json(
      { error: 'Помилка при отриманні заявок' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('=== START APPLICATION API ===')
    
    const body = await request.json()
    console.log('Received request body:', JSON.stringify(body, null, 2))

    const { name, email, phone, message, courseName } = body

    // Детальна валідація
    console.log('Validating fields:', {
      name: name?.length > 0,
      email: email?.length > 0,
      phone: phone?.length > 0,
      courseName: courseName?.length > 0
    })

    if (!name || !email || !phone || !courseName) {
      console.log('❌ Validation failed - missing required fields', {
        name: !!name,
        email: !!email,
        phone: !!phone,
        courseName: !!courseName
      })
      return NextResponse.json(
        { error: 'Всі обовʼязкові поля повинні бути заповнені' },
        { status: 400 }
      )
    }

    console.log('✅ All required fields are present')

    // Знаходимо курс за назвою
    console.log('Searching for course:', courseName)
    const course = await prisma.course.findFirst({
      where: { 
        title: courseName 
      }
    })

    console.log('Course found:', course)

    // Підготуємо дані для створення заявки
    const applicationData: ApplicationData = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      message: message?.trim() || '',
      status: 'pending'
    }

    // Додаємо courseId тільки якщо курс знайдено
    // if (course) {
    //   applicationData.courseId = course.id
    //   console.log('Using course ID:', course.id)
    // } else {
    //   console.log('⚠️ Course not found, creating application without course ID')
    // }

    // Створення заявки
    console.log('Creating application in database...')
    const application = await prisma.application.create({
      data: applicationData
    })

    console.log('✅ Application created successfully:', application.id)
    console.log('=== END APPLICATION API ===')

    return NextResponse.json(
      { 
        message: 'Заявку успішно відправлено!', 
        application 
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('❌ Application creation error:', error)
    
    // Детальна інформація про помилку
    if (error instanceof Error) {
      console.error('Error name:', error.name)
      console.error('Error message:', error.message)
      console.error('Error stack:', error.stack)
    }
    
    return NextResponse.json(
      { error: 'Помилка при відправці заявки' },
      { status: 500 }
    )
  }
}