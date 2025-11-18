export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  id: number;
  name: string;
  position: string;
  text: string;
  rating: number;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface Course {
  id: number;
  title: string;
  description: string;
  level: string;
  duration: string;
  price: string;
  features: string[];
  icon: string;
}

export interface Course {
  id: number;
  title: string;
  description: string;
  level: string;
  duration: string;
  price: string;
  features: string[];
  icon: string;
  fullDescription?: string;
  curriculum?: string[];
  requirements?: string[];
  instructor?: string;
  schedule?: string;
  maxStudents?: number;
}

export interface CourseDetailProps {
  params: Promise<{ id: string }>;
}