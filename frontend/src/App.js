import React, {useEffect, useState} from 'react'
import './index.css'
import {useDropzone} from 'react-dropzone'
import axios from 'axios'

function App() {
  const [files, setFiles] = useState({resumes: []})
  const [error, setError] = useState(null)
  const [currentStep, setCurrentStep] = useState(1)
  const [manualJobEntry, setManualJobEntry] = useState('')

  // Обработчик для загрузки файлов
  const onDrop = (acceptedFiles, fileType) => {
    const validTypes = ['application/pdf', 'application/msword', 'text/plain']

    // Фильтруем файлы по типу
    const invalidFiles = acceptedFiles.filter(
      file => !validTypes.includes(file.type)
    )
    if (invalidFiles.length === 0) {
      setError(null)
      setFiles(prevFiles => ({
        ...prevFiles,
        [fileType]: [...prevFiles[fileType], ...acceptedFiles], // Сохраняем файлы по типу
      }))
    } else {
      setError(
        'Недопустимые типы файлов. Пожалуйста, загрузите файлы PDF, DOC или TXT.'
      )
    }
  }

  const {getRootProps: getResumeProps, getInputProps: getResumeInputProps} =
    useDropzone({
      onDrop: acceptedFiles => onDrop(acceptedFiles, 'resumes'),
      accept: '.pdf,.doc,.txt',
      multiple: true,
    })

  const {getRootProps: getJobDocProps, getInputProps: getJobDocInputProps} =
    useDropzone({
      onDrop: acceptedFiles => onDrop(acceptedFiles, 'jobDocs'),
      accept: '.pdf,.doc,.txt',
      multiple: true,
    })

  useEffect(() => {
    if (currentStep === 3) {
      const formData = new FormData()
      files.resumes.forEach(file => {
        formData.append('resumes', file)
      })
      formData.append('vacancy', manualJobEntry)
      axios
        .post(
          'http://localhost:3000/upload/',
          formData,
          {
            headers: {
              'content-type': 'multipart/form-data',
            },
          }
        )
        .then(response => {
          console.log(response.data)
        })
    }
  })

  // Переход к следующему шагу
  const nextStep = () => {
    if (currentStep === 1 && files.resumes.length === 0) {
      setError('Загрузите хотя бы одно резюме.')
      return
    }

    if (currentStep === 2 && !manualJobEntry) {
      setError('Введите описание вакансии или загрузите документ о вакансии.')
      return
    }

    setError(null) // Очистка ошибок
    setCurrentStep(prevStep => Math.min(prevStep + 1, 3)) // Переходим к следующему шагу
  }

  // Переход к предыдущему шагу
  const prevStep = () => {
    setCurrentStep(prevStep => Math.max(prevStep - 1, 1))
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 py-10 space-y-6">
      {/* Stepper */}
      <div className="w-full max-w-xl flex items-center justify-between mb-8">
        <div
          className={`flex flex-col items-center ${
            currentStep >= 1 ? 'text-indigo-600' : 'text-gray-400'
          }`}
        >
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${
              currentStep >= 1
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'border-gray-300 text-gray-600'
            }`}
          >
            1
          </div>
          <span
            className={`font-semibold mt-2 ${
              currentStep >= 1 ? 'text-indigo-600' : 'text-gray-400'
            }`}
          >
            Резюме
          </span>
        </div>

        <div
          className={`flex flex-col items-center ${
            currentStep >= 2 ? 'text-indigo-600' : 'text-gray-400'
          }`}
        >
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${
              currentStep >= 2
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'border-gray-300 text-gray-600'
            }`}
          >
            2
          </div>
          <span
            className={`font-semibold mt-2 ${
              currentStep >= 2 ? 'text-indigo-600' : 'text-gray-400'
            }`}
          >
            Вакансии
          </span>
        </div>

        <div
          className={`flex flex-col items-center ${
            currentStep >= 3 ? 'text-indigo-600' : 'text-gray-400'
          }`}
        >
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${
              currentStep >= 3
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'border-gray-300 text-gray-600'
            }`}
          >
            3
          </div>
          <span
            className={`font-semibold mt-2 ${
              currentStep >= 3 ? 'text-indigo-600' : 'text-gray-400'
            }`}
          >
            Кандидаты
          </span>
        </div>
      </div>

      {/* Step 1: Resume Upload */}
      {currentStep === 1 && (
        <section className="w-full max-w-xl bg-white p-8 rounded-lg shadow-md text-center">
          <h1 className="text-3xl font-semibold text-indigo-600 mb-6">
            Загрузить резюме
          </h1>

          <p className="text-gray-500 text-sm mb-4">Загрузите ваше резюме:</p>

          <div
            {...getResumeProps()}
            className="flex flex-col items-center justify-center w-full h-72 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 mb-4"
          >
            <input {...getResumeInputProps()} />
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Загрузить резюме</span> или
              перетащите файл
            </p>
            <p className="text-xs text-gray-500">PDF, DOC, TXT</p>
          </div>

          {/* Отображение загруженных резюме */}
          {files.resumes.length > 0 && (
            <div className="mt-4 text-left">
              <h2 className="text-lg font-semibold text-indigo-600">
                Загруженные резюме:
              </h2>
              <ul className="list-disc pl-6 mt-2 text-sm text-gray-700">
                {files.resumes.map((file, index) => (
                  <li key={index} className="mb-2">
                    <strong>{file.name}</strong> (
                    {(file.size / 1024).toFixed(2)} KB)
                  </li>
                ))}
              </ul>
            </div>
          )}

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <button
            onClick={nextStep}
            className="mt-4 w-full py-3 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 transition duration-200"
          >
            Дальше
          </button>
        </section>
      )}

      {/* Step 2: Job Description Entry */}
      {currentStep === 2 && (
        <section className="w-full max-w-xl bg-white p-8 rounded-lg shadow-md text-center">
          <h1 className="text-3xl font-semibold text-indigo-600 mb-6">
            Вакансия
          </h1>

          <textarea
            placeholder="Опишите критерий вакансии..."
            value={manualJobEntry}
            onChange={e => setManualJobEntry(e.target.value)}
            className="w-full h-32 px-4 py-3 border border-indigo-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-indigo-50 shadow-sm mb-4"
          />

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <div className="flex justify-between mt-4">
            <button
              onClick={prevStep}
              className="py-2 px-6 bg-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-400 transition duration-200"
            >
              Назад
            </button>
            <button
              onClick={nextStep}
              className="py-2 px-6 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 transition duration-200"
            >
              Дальше
            </button>
          </div>
        </section>
      )}

      {/* Step 3: Candidates Display */}
      {currentStep === 3 && (
        <section className="w-full max-w-xl bg-white p-8 rounded-lg shadow-md text-center">
          <h1 className="text-3xl font-semibold text-indigo-600 mb-6">
            Результаты поиска
          </h1>
          <p className="text-gray-500">
            Отобразите кандидатов, соответствующих вакансии.
          </p>
          {/* Здесь будет логика для отображения кандидатов */}
        </section>
      )}
    </div>
  )
}

export default App
