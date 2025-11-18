"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "../styles/Home.module.css";

interface Course {
  id: number;
  title: string;
  description: string;
  level: string;
  duration: string;
  price: string;
  features: string[];
  icon: string;
}

interface CourseCardProps {
  course: Course;
  index: number;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getLevelColor = (level: string) => {
    const colors = {
      Початковий: "#10b981",
      Середній: "#3b82f6",
      Просунутий: "#8b5cf6",
      "Всі рівні": "#6b7280",
      "Середній+": "#f59e0b",
    };
    return colors[level as keyof typeof colors] || "#6b7280";
  };

  return (
    <div
      className={`${styles.courseCard} ${
        isHovered ? styles.courseCardHovered : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header with icon and level */}
      <div className={styles.courseHeader}>
        <div className={styles.courseIconContainer}>
          <div className={styles.courseIcon}>{course.icon}</div>
        </div>
        <div
          className={styles.courseLevel}
          style={{ backgroundColor: getLevelColor(course.level) }}
        >
          {course.level}
        </div>
      </div>

      {/* Course content */}
      <div className={styles.courseContent}>
        <h3 className={styles.courseTitle}>{course.title}</h3>
        <p className={styles.courseDescription}>{course.description}</p>

        <div className={styles.courseFeatures}>
          {course.features.map((feature, idx) => (
            <div key={idx} className={styles.courseFeature}>
              <div className={styles.featureDot}></div>
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer with price and CTA */}
      <div className={styles.courseFooter}>
        <div className={styles.courseMeta}>
          <div className={styles.courseDuration}>
            <span className={styles.durationIcon}>⌛</span>
            {course.duration}
          </div>
          <div className={styles.coursePrice}>
            <span className={styles.priceValue}>{course.price}</span>
          </div>
        </div>
        <Link
          href={`/courses/${course.id}`}
          className={`${styles.courseButton} ${
            isHovered ? styles.courseButtonHovered : ""
          }`}
        >
          <span>Детальніше</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            className={styles.buttonArrow}
          >
            <path
              d="M5 12H19M19 12L12 5M19 12L12 19"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>

      {/* Hover border effect */}
      <div className={styles.courseBorder}></div>
    </div>
  );
};

export default CourseCard;
