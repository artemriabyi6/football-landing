import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding...')

  const courses = await prisma.course.createMany({
    data: [
      {
        title: 'Фундаментальна техніка',
        description: 'Основи контролю мʼяча, пасів та ударів для початківців',
        level: 'Початковий',
        duration: '8 тижнів',
        price: '₴3,200',
        icon: '🎯'
      },
      {
        title: 'Просунута техніка',
        description: 'Складні технічні елементи та ігрова практика',
        level: 'Середній',
        duration: '12 тижнів',
        price: '₴4,800',
        icon: '⚡'
      },
      {
        title: 'Професійна підготовка',
        description: 'Інтенсивна програма для майбутніх професіоналів',
        level: 'Просунутий',
        duration: '16 тижнів',
        price: '₴6,400',
        icon: '🔥'
      },
      {
        title: 'Воротарська майстерність',
        description: 'Спеціалізована програма для воротарів усіх рівнів',
        level: 'Всі рівні',
        duration: '10 тижнів',
        price: '₴4,000',
        icon: '🧤'
      },
      {
        title: 'Фізична підготовка',
        description: 'Розвиток швидкості, сили та витривалості',
        level: 'Всі рівні',
        duration: '6 тижнів',
        price: '₴2,400',
        icon: '💪'
      },
      {
        title: 'Тактичний інтелект',
        description: 'Розвиток футбольного мислення та тактичної обізнаності',
        level: 'Середній+',
        duration: '8 тижнів',
        price: '₴3,600',
        icon: '🧠'
      }
    ],
    skipDuplicates: true,
  })

  console.log(`Created ${courses.count} courses`)

  const admin = await prisma.admin.create({
    data: {
      email: 'admin@footballpro.com',
      password: 'admin123',
      name: 'Головний Адміністратор'
    }
  })

  console.log('Created admin:', admin.email)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })