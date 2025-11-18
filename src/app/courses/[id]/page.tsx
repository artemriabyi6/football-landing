import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCourseById, coursesData } from '../../../lib/coursesData';
import CourseDetail from '../../../components/CourseDetail';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const course = await getCourseById(id);
  
  if (!course) {
    return {
      title: 'Курс не знайдено | FootballPro',
      description: 'Запрошений курс не знайдено',
    };
  }

  return {
    title: `${course.title} | FootballPro`,
    description: course.description,
  };
}

export default async function CoursePage({ params }: PageProps) {
  const { id } = await params;
  const course = await getCourseById(id);

  if (!course) {
    notFound();
  }

  return <CourseDetail course={course} />;
}

export async function generateStaticParams() {
  return coursesData.map((course) => ({
    id: course.id.toString(),
  }));
}