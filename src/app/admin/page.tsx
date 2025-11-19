'use client'

import { useState, useEffect } from 'react'
import styles from '../../styles/Admin.module.css'

interface Application {
  id: number
  name: string
  email: string
  phone: string
  message: string | null
  status: string
  createdAt: string
  course: {
    title: string
  } | null
}

type SortOption = 'all' | 'pending' | 'approved' | 'rejected'

export default function AdminPanel() {
  const [applications, setApplications] = useState<Application[]>([])
  const [filteredApplications, setFilteredApplications] = useState<Application[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string>('')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState<SortOption>('all')
  const applicationsPerPage = 7

  const fetchApplications = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/applications')
      
      if (!response.ok) {
        throw new Error('Помилка завантаження заявок')
      }
      
      const data = await response.json()
      setApplications(data)
      setFilteredApplications(data)
    } catch (error) {
      console.error('Error fetching applications:', error)
      setError('Не вдалося завантажити заявки')
    } finally {
      setIsLoading(false)
    }
  }

  const updateStatus = async (applicationId: number, newStatus: string) => {
    try {
      const response = await fetch(`/api/applications/${applicationId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: newStatus
        }),
      })

      if (response.ok) {
        // Оновлюємо статус локально
        const updatedApplications = applications.map(app =>
          app.id === applicationId ? { ...app, status: newStatus } : app
        )
        setApplications(updatedApplications)
        
        // Оновлюємо відфільтровані заявки
        if (sortBy !== 'all') {
          setFilteredApplications(
            updatedApplications.filter(app => app.status === sortBy)
          )
        } else {
          setFilteredApplications(updatedApplications)
        }
      } else {
        throw new Error('Помилка оновлення статусу')
      }
    } catch (error) {
      console.error('Error updating status:', error)
      alert('Не вдалося оновити статус')
    }
  }

  // Фільтрація заявок по статусу
  useEffect(() => {
    if (sortBy === 'all') {
      setFilteredApplications(applications)
    } else {
      setFilteredApplications(applications.filter(app => app.status === sortBy))
    }
    setCurrentPage(1) // Скидаємо на першу сторінку при зміні фільтра
  }, [sortBy, applications])

  useEffect(() => {
    fetchApplications()
  }, [])

  // Пагінація
  const indexOfLastApplication = currentPage * applicationsPerPage
  const indexOfFirstApplication = indexOfLastApplication - applicationsPerPage
  const currentApplications = filteredApplications.slice(indexOfFirstApplication, indexOfLastApplication)
  const totalPages = Math.ceil(filteredApplications.length / applicationsPerPage)

  const getStatusText = (status: string) => {
    const statusMap: { [key: string]: string } = {
      'pending': 'Очікує',
      'approved': 'Підтверджено',
      'rejected': 'Відхилено'
    }
    return statusMap[status] || status
  }

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  const handleSortChange = (newSort: SortOption) => {
    setSortBy(newSort)
  }

  const renderPaginationButtons = () => {
    const buttons = []
    
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`${styles.pageButton} ${currentPage === i ? styles.activePage : ''}`}
        >
          {i}
        </button>
      )
    }
    
    return buttons
  }

  return (
    <div className={styles.adminPanel}>
      <div className={styles.adminHeader}>
        <h1>Адмін-панель - Заявки на курси</h1>
        <button 
          onClick={fetchApplications} 
          className={styles.refreshButton}
          disabled={isLoading}
        >
          {isLoading ? 'Оновлення...' : 'Оновити'}
        </button>
      </div>
      
      {/* Фільтри сортування */}
      <div className={styles.sortControls}>
        <h3>Фільтр по статусу:</h3>
        <div className={styles.sortButtons}>
          <button
            onClick={() => handleSortChange('all')}
            className={`${styles.sortButton} ${sortBy === 'all' ? styles.activeSort : ''}`}
          >
            Всі ({applications.length})
          </button>
          <button
            onClick={() => handleSortChange('pending')}
            className={`${styles.sortButton} ${sortBy === 'pending' ? styles.activeSort : ''}`}
          >
            Очікують ({applications.filter(app => app.status === 'pending').length})
          </button>
          <button
            onClick={() => handleSortChange('approved')}
            className={`${styles.sortButton} ${sortBy === 'approved' ? styles.activeSort : ''}`}
          >
            Підтверджені ({applications.filter(app => app.status === 'approved').length})
          </button>
          <button
            onClick={() => handleSortChange('rejected')}
            className={`${styles.sortButton} ${sortBy === 'rejected' ? styles.activeSort : ''}`}
          >
            Відхилені ({applications.filter(app => app.status === 'rejected').length})
          </button>
        </div>
      </div>

      {error && (
        <div className={styles.errorMessage}>
          {error}
          <button onClick={fetchApplications} className={styles.retryButton}>
            Спробувати знову
          </button>
        </div>
      )}

      {isLoading ? (
        <div className={styles.loading}>Завантаження заявок...</div>
      ) : filteredApplications.length === 0 ? (
        <div className={styles.noApplications}>
          {sortBy === 'all' ? 'Немає заявок' : `Немає заявок з статусом "${getStatusText(sortBy)}"`}
        </div>
      ) : (
        <>
          <div className={styles.applicationsInfo}>
            <p>
              Показано {currentApplications.length} з {filteredApplications.length} заявок 
              {sortBy !== 'all' && ` (відфільтровано по статусу: ${getStatusText(sortBy)})`}
            </p>
          </div>

          <div className={styles.applicationsList}>
            {currentApplications.map((application) => (
              <div key={application.id} className={styles.applicationCard}>
                <div className={styles.applicationHeader}>
                  <h3>{application.name}</h3>
                  <span className={`${styles.status} ${styles[application.status]}`}>
                    {getStatusText(application.status)}
                  </span>
                </div>
                
                <div className={styles.applicationDetails}>
                  <p><strong>Курс:</strong> {application.course?.title || 'Не вказано'}</p>
                  <p><strong>Email:</strong> {application.email}</p>
                  <p><strong>Телефон:</strong> {application.phone}</p>
                  <p><strong>Дата:</strong> {new Date(application.createdAt).toLocaleDateString('uk-UA')}</p>
                  {application.message && (
                    <p><strong>Повідомлення:</strong> {application.message}</p>
                  )}
                </div>

                <div className={styles.applicationActions}>
                  <button
                    onClick={() => updateStatus(application.id, 'approved')}
                    className={styles.approveButton}
                    disabled={application.status === 'approved'}
                  >
                    Підтвердити
                  </button>
                  <button
                    onClick={() => updateStatus(application.id, 'rejected')}
                    className={styles.rejectButton}
                    disabled={application.status === 'rejected'}
                  >
                    Відхилити
                  </button>
                  <button
                    onClick={() => updateStatus(application.id, 'pending')}
                    className={styles.pendingButton}
                    disabled={application.status === 'pending'}
                  >
                    В очікуванні
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Пагінація */}
          {totalPages > 1 && (
            <div className={styles.pagination}>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={styles.pageNavButton}
              >
                Попередня
              </button>
              
              <div className={styles.pageNumbers}>
                {renderPaginationButtons()}
              </div>
              
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={styles.pageNavButton}
              >
                Наступна
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}