// pages/Admin/Results.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaSearch, FaFilter, FaFileExport, FaEye, 
  FaCheckCircle, FaTimesCircle, FaClock,
  FaChartBar, FaDownload, FaCalendar,
  FaSort, FaSortUp, FaSortDown,
  FaFilePdf, FaFileWord, FaFileCode, FaFileImage,
  FaFileAlt, FaInfoCircle, FaSpinner,
  FaUsers, FaChartLine, FaAward, FaRocket,
  FaArrowLeft, FaArrowRight, FaTimes,
  FaLightbulb, FaDatabase, FaUserGraduate,
  FaArrowUp, FaArrowDown
} from 'react-icons/fa';
import { useAdmin } from '../../context/AdminContext.jsx';
import { useQuiz } from '../../context/QuizContext.jsx';
import { quizCategories } from '../../data/quizCategories.js';
import toast from 'react-hot-toast';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import html2canvas from 'html2canvas';

function AdminResults() {
  const { loadQuizAttempts, students } = useAdmin();
  const [attempts, setAttempts] = useState([]);
  const [filteredAttempts, setFilteredAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [showDataPreview, setShowDataPreview] = useState(true);
  const [previewPage, setPreviewPage] = useState(1);
  const [previewItemsPerPage] = useState(10);
  const [filters, setFilters] = useState({
    quizTopic: 'all',
    studentName: '',
    dateRange: 'all',
    scoreRange: 'all',
    status: 'all',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [sortField, setSortField] = useState('timestamp');
  const [sortDirection, setSortDirection] = useState('desc');
  const [hoveredRow, setHoveredRow] = useState(null);

  // Statistics
  const [stats, setStats] = useState({
    totalAttempts: 0,
    passed: 0,
    failed: 0,
    passRate: 0,
    averageScore: 0,
  });

  const getSortIcon = (field) => {
    if (sortField !== field) return <FaSort className="text-gray-400" />;
    return sortDirection === 'asc' ? <FaSortUp className="text-purple-500" /> : <FaSortDown className="text-purple-500" />;
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, attempts]);

  const loadData = () => {
    setLoading(true);
    try {
      const loadedAttempts = loadQuizAttempts();
      const attemptsWithNames = loadedAttempts.map(attempt => {
        const student = students.find(s => s.id === attempt.studentId);
        return {
          ...attempt,
          studentName: student?.fullName || 'Unknown Student',
          studentEmail: student?.email || 'N/A',
        };
      });
      setAttempts(attemptsWithNames);
      setFilteredAttempts(attemptsWithNames);
      
      const total = attemptsWithNames.length;
      const passed = attemptsWithNames.filter(a => a.score >= 90).length;
      const failed = attemptsWithNames.filter(a => a.score < 90).length;
      const avgScore = total > 0 
        ? Math.round(attemptsWithNames.reduce((acc, a) => acc + a.score, 0) / total)
        : 0;
      
      setStats({
        totalAttempts: total,
        passed,
        failed,
        passRate: total > 0 ? Math.round((passed / total) * 100) : 0,
        averageScore: avgScore,
      });
    } catch (error) {
      console.error('Error loading results:', error);
      toast.error('Failed to load results');
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...attempts];

    if (filters.quizTopic !== 'all') {
      filtered = filtered.filter(a => a.quizTitle === filters.quizTopic);
    }

    if (filters.studentName) {
      filtered = filtered.filter(a => 
        a.studentName?.toLowerCase().includes(filters.studentName.toLowerCase())
      );
    }

    if (filters.dateRange !== 'all') {
      const now = new Date();
      const range = {
        'today': 1,
        'week': 7,
        'month': 30,
        'year': 365
      };
      const days = range[filters.dateRange];
      if (days) {
        const cutoff = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
        filtered = filtered.filter(a => new Date(a.timestamp) >= cutoff);
      }
    }

    if (filters.scoreRange !== 'all') {
      const range = {
        '90-100': [90, 100],
        '80-89': [80, 89],
        '70-79': [70, 79],
        '60-69': [60, 69],
        'below-60': [0, 59]
      };
      const [min, max] = range[filters.scoreRange] || [0, 100];
      filtered = filtered.filter(a => a.score >= min && a.score <= max);
    }

    if (filters.status !== 'all') {
      const passed = filters.status === 'passed';
      filtered = filtered.filter(a => (a.score >= 90) === passed);
    }

    filtered.sort((a, b) => {
      let aVal = a[sortField] || '';
      let bVal = b[sortField] || '';
      
      if (sortField === 'score') {
        return sortDirection === 'asc' ? (aVal - bVal) : (bVal - aVal);
      }
      
      if (typeof aVal === 'string') aVal = aVal.toLowerCase();
      if (typeof bVal === 'string') bVal = bVal.toLowerCase();
      
      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    setFilteredAttempts(filtered);
    setCurrentPage(1);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
    applyFilters();
  };

  const formatTime = (seconds) => {
    if (!seconds) return 'N/A';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const getStatusBadge = (score) => {
    if (score >= 90) {
      return { text: 'Passed', color: 'bg-emerald-100/50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 border-emerald-200/50 dark:border-emerald-700/30', icon: FaCheckCircle };
    }
    return { text: 'Failed', color: 'bg-rose-100/50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300 border-rose-200/50 dark:border-rose-700/30', icon: FaTimesCircle };
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-emerald-500';
    if (score >= 70) return 'text-amber-500';
    return 'text-rose-500';
  };

  const getScoreGradient = (score) => {
    if (score >= 90) return 'from-emerald-500 to-teal-500';
    if (score >= 70) return 'from-amber-500 to-orange-500';
    return 'from-rose-500 to-red-500';
  };

  const totalPages = Math.ceil(filteredAttempts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAttempts = filteredAttempts.slice(startIndex, startIndex + itemsPerPage);

  const previewHeaders = ['Student', 'Quiz', 'Date', 'Score', 'Correct', 'Wrong', 'Status'];
  const totalFilteredCount = filteredAttempts.length;
  const previewTotalPages = Math.ceil(totalFilteredCount / previewItemsPerPage);
  const previewStartIndex = (previewPage - 1) * previewItemsPerPage;
  const previewPaginatedData = filteredAttempts.slice(previewStartIndex, previewStartIndex + previewItemsPerPage);

  const getExportData = () => {
    return filteredAttempts.map((a, index) => ({
      '#': index + 1,
      'Student': a.studentName || 'Unknown',
      'Email': a.studentEmail || 'N/A',
      'Quiz': a.quizTitle || '',
      'Date': a.timestamp ? new Date(a.timestamp).toLocaleDateString() : '',
      'Score': `${a.score || 0}%`,
      'Correct': a.passed || 0,
      'Wrong': a.failed || 0,
      'Unanswered': a.unanswered || 0,
      'Total': a.total || 0,
      'Time': formatTime(a.timeTaken),
      'Status': (a.score || 0) >= 90 ? 'Passed' : 'Failed'
    }));
  };

  const hasData = filteredAttempts.length > 0;
  const exportCount = filteredAttempts.length;

  const exportJSON = () => {
    if (!hasData) {
      toast.error('No results available to export.');
      return;
    }
    
    setExporting(true);
    try {
      const data = JSON.stringify(getExportData(), null, 2);
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `results-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success(`Results exported as JSON successfully! (${exportCount} records)`);
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Failed to export as JSON');
    } finally {
      setExporting(false);
    }
  };

  const exportPDF = () => {
    if (!hasData) {
      toast.error('No results available to export.');
      return;
    }

    setExporting(true);
    try {
      const dataToExport = getExportData();
      const doc = new jsPDF('landscape', 'mm', 'a4');
      const pageWidth = doc.internal.pageSize.getWidth();
      
      // Header with gradient
      doc.setFillColor(79, 70, 229);
      doc.rect(0, 0, pageWidth, 45, 'F');
      
      doc.setFontSize(18);
      doc.setTextColor(255, 255, 255);
      doc.text('Quiz Results Report', pageWidth / 2, 18, { align: 'center' });
      
      doc.setFontSize(9);
      doc.setTextColor(220, 220, 255);
      doc.text(`Generated: ${new Date().toLocaleString()}`, pageWidth / 2, 28, { align: 'center' });
      doc.text(`Total Records: ${dataToExport.length}`, pageWidth / 2, 34, { align: 'center' });
      
      const headers = ['#', 'Student', 'Quiz', 'Date', 'Score', 'Correct', 'Wrong', 'Unanswered', 'Total', 'Time', 'Status'];
      const body = dataToExport.map(row => [
        row['#'], row['Student'], row['Quiz'], row['Date'], row['Score'],
        row['Correct'], row['Wrong'], row['Unanswered'], row['Total'], row['Time'], row['Status']
      ]);

      doc.autoTable({
        startY: 50,
        head: [headers],
        body: body,
        theme: 'striped',
        headStyles: {
          fillColor: [79, 70, 229],
          textColor: [255, 255, 255],
          fontSize: 7,
          fontStyle: 'bold',
        },
        bodyStyles: {
          fontSize: 6,
        },
        margin: { left: 20, right: 20 },
        didDrawPage: function(data) {
          const pageCount = doc.internal.getNumberOfPages();
          doc.setFontSize(7);
          doc.setTextColor(150, 150, 150);
          doc.text(
            `Page ${data.pageNumber} of ${pageCount}`,
            pageWidth / 2,
            doc.internal.pageSize.getHeight() - 8,
            { align: 'center' }
          );
        }
      });

      doc.save(`results-${new Date().toISOString().split('T')[0]}.pdf`);
      toast.success(`Results exported as PDF successfully! (${exportCount} records)`);
    } catch (error) {
      console.error('PDF export error:', error);
      toast.error('Failed to export as PDF');
    } finally {
      setExporting(false);
    }
  };

  const exportDOCX = () => {
    if (!hasData) {
      toast.error('No results available to export.');
      return;
    }

    setExporting(true);
    try {
      const dataToExport = getExportData();
      
      let htmlContent = `
        <html>
          <head>
            <meta charset="UTF-8">
            <title>Quiz Results Report</title>
            <style>
              body { font-family: 'Segoe UI', Arial, sans-serif; padding: 40px; background: #f8fafc; }
              .container { max-width: 1200px; margin: 0 auto; background: white; padding: 40px; border-radius: 12px; }
              h1 { color: #4F46E5; border-bottom: 3px solid #4F46E5; padding-bottom: 15px; }
              .meta { color: #64748b; font-size: 14px; margin: 5px 0; }
              .summary { background: #f1f5f9; padding: 15px; border-radius: 8px; margin: 15px 0; }
              table { width: 100%; border-collapse: collapse; margin-top: 20px; }
              th { background: #4F46E5; color: white; padding: 10px; text-align: left; font-size: 11px; }
              td { padding: 8px; border-bottom: 1px solid #e2e8f0; font-size: 11px; }
              .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #64748b; font-size: 12px; text-align: center; }
              .passed { color: #22c55e; font-weight: 600; }
              .failed { color: #ef4444; font-weight: 600; }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>📊 Quiz Results Report</h1>
              <div class="meta">Generated: ${new Date().toLocaleString()}</div>
              <div class="summary"><strong>Total Records:</strong> ${dataToExport.length}</div>
              <table>
                <thead><tr>
                  <th>#</th><th>Student</th><th>Quiz</th><th>Date</th>
                  <th>Score</th><th>Correct</th><th>Wrong</th>
                  <th>Unanswered</th><th>Total</th><th>Time</th><th>Status</th>
                </tr></thead>
                <tbody>
      `;

      dataToExport.forEach(row => {
        const statusClass = row['Status'] === 'Passed' ? 'passed' : 'failed';
        htmlContent += `
          <tr>
            <td>${row['#']}</td>
            <td><strong>${row['Student']}</strong></td>
            <td>${row['Quiz']}</td>
            <td>${row['Date']}</td>
            <td><strong>${row['Score']}</strong></td>
            <td>${row['Correct']}</td>
            <td>${row['Wrong']}</td>
            <td>${row['Unanswered']}</td>
            <td>${row['Total']}</td>
            <td>${row['Time']}</td>
            <td class="${statusClass}">${row['Status']}</td>
          </tr>
        `;
      });

      htmlContent += `
                </tbody>
              </table>
              <div class="footer">
                <p>Generated by QuizMaster Admin Panel</p>
                <p>&copy; ${new Date().getFullYear()} JEO Digital Solutions</p>
              </div>
            </div>
          </body>
        </html>
      `;

      const blob = new Blob([htmlContent], { type: 'application/msword' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `results-${new Date().toISOString().split('T')[0]}.doc`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success(`Results exported as DOCX successfully! (${exportCount} records)`);
    } catch (error) {
      console.error('DOCX export error:', error);
      toast.error('Failed to export as DOCX');
    } finally {
      setExporting(false);
    }
  };

  const exportHTML = () => {
    if (!hasData) {
      toast.error('No results available to export.');
      return;
    }

    setExporting(true);
    try {
      const dataToExport = getExportData();
      
      let htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Quiz Results Report</title>
            <style>
              * { margin: 0; padding: 0; box-sizing: border-box; }
              body { font-family: 'Segoe UI', system-ui, sans-serif; padding: 40px; background: #f8fafc; }
              .container { max-width: 1200px; margin: 0 auto; background: white; padding: 40px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
              h1 { color: #4F46E5; border-bottom: 3px solid #4F46E5; padding-bottom: 15px; margin-bottom: 20px; }
              .meta { color: #64748b; margin-bottom: 8px; font-size: 14px; }
              .summary { background: #f1f5f9; padding: 15px; border-radius: 8px; margin-bottom: 20px; }
              table { width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 12px; }
              th { background: #4F46E5; color: white; padding: 10px; text-align: left; font-weight: 600; }
              td { padding: 8px; border-bottom: 1px solid #e2e8f0; }
              tr:hover { background: #f8fafc; }
              .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #64748b; font-size: 12px; text-align: center; }
              .passed { color: #22c55e; font-weight: 600; }
              .failed { color: #ef4444; font-weight: 600; }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>📊 Quiz Results Report</h1>
              <div class="meta">Generated: ${new Date().toLocaleString()}</div>
              <div class="summary"><strong>Total Records:</strong> ${dataToExport.length}</div>
              <table>
                <thead><tr>
                  <th>#</th><th>Student</th><th>Quiz</th><th>Date</th>
                  <th>Score</th><th>Correct</th><th>Wrong</th>
                  <th>Unanswered</th><th>Total</th><th>Time</th><th>Status</th>
                </tr></thead>
                <tbody>
      `;

      dataToExport.forEach(row => {
        const statusClass = row['Status'] === 'Passed' ? 'passed' : 'failed';
        htmlContent += `
          <tr>
            <td>${row['#']}</td>
            <td><strong>${row['Student']}</strong></td>
            <td>${row['Quiz']}</td>
            <td>${row['Date']}</td>
            <td><strong>${row['Score']}</strong></td>
            <td>${row['Correct']}</td>
            <td>${row['Wrong']}</td>
            <td>${row['Unanswered']}</td>
            <td>${row['Total']}</td>
            <td>${row['Time']}</td>
            <td class="${statusClass}">${row['Status']}</td>
          </tr>
        `;
      });

      htmlContent += `
                </tbody>
              </table>
              <div class="footer">
                <p>Generated by QuizMaster Admin Panel</p>
                <p>&copy; ${new Date().getFullYear()} JEO Digital Solutions</p>
              </div>
            </div>
          </body>
        </html>
      `;

      const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `results-${new Date().toISOString().split('T')[0]}.html`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success(`Results exported as HTML successfully! (${exportCount} records)`);
    } catch (error) {
      console.error('HTML export error:', error);
      toast.error('Failed to export as HTML');
    } finally {
      setExporting(false);
    }
  };

  const exportTXT = () => {
    if (!hasData) {
      toast.error('No results available to export.');
      return;
    }

    setExporting(true);
    try {
      const dataToExport = getExportData();
      
      let txtContent = '='.repeat(100) + '\n';
      txtContent += 'QUIZ RESULTS REPORT\n';
      txtContent += '='.repeat(100) + '\n\n';
      txtContent += `Generated: ${new Date().toLocaleString()}\n`;
      txtContent += `Total Records: ${dataToExport.length}\n\n`;
      txtContent += '-'.repeat(100) + '\n\n';

      dataToExport.forEach((row, index) => {
        txtContent += `Record #${index + 1}\n`;
        txtContent += `  Student: ${row['Student']}\n`;
        txtContent += `  Quiz: ${row['Quiz']}\n`;
        txtContent += `  Date: ${row['Date']}\n`;
        txtContent += `  Score: ${row['Score']}\n`;
        txtContent += `  Correct: ${row['Correct']}\n`;
        txtContent += `  Wrong: ${row['Wrong']}\n`;
        txtContent += `  Unanswered: ${row['Unanswered']}\n`;
        txtContent += `  Total: ${row['Total']}\n`;
        txtContent += `  Time: ${row['Time']}\n`;
        txtContent += `  Status: ${row['Status']}\n`;
        txtContent += '\n' + '-'.repeat(50) + '\n\n';
      });

      txtContent += '\n' + '='.repeat(100) + '\n';
      txtContent += 'End of Report\n';
      txtContent += '='.repeat(100) + '\n';

      const blob = new Blob([txtContent], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `results-${new Date().toISOString().split('T')[0]}.txt`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success(`Results exported as TXT successfully! (${exportCount} records)`);
    } catch (error) {
      console.error('TXT export error:', error);
      toast.error('Failed to export as TXT');
    } finally {
      setExporting(false);
    }
  };

  const exportImage = () => {
    if (!hasData) {
      toast.error('No results available to export.');
      return;
    }

    setExporting(true);
    try {
      const dataToExport = getExportData().slice(0, 50);
      
      const container = document.createElement('div');
      container.style.cssText = `
        padding: 40px;
        background: white;
        font-family: 'Segoe UI', system-ui, sans-serif;
        max-width: 1200px;
        margin: 0 auto;
      `;
      
      let htmlContent = `
        <h1 style="color: #4F46E5; border-bottom: 3px solid #4F46E5; padding-bottom: 15px; margin-bottom: 20px;">
          📊 Quiz Results Report
        </h1>
        <p style="color: #64748b; margin-bottom: 8px; font-size: 14px;">
          Generated: ${new Date().toLocaleString()}
        </p>
        <p style="color: #64748b; margin-bottom: 20px; font-size: 14px;">
          Total Records: ${dataToExport.length}
        </p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 11px;">
          <thead>
            <tr style="background: #4F46E5; color: white;">
              <th style="padding: 8px; text-align: left;">#</th>
              <th style="padding: 8px; text-align: left;">Student</th>
              <th style="padding: 8px; text-align: left;">Quiz</th>
              <th style="padding: 8px; text-align: left;">Date</th>
              <th style="padding: 8px; text-align: left;">Score</th>
              <th style="padding: 8px; text-align: left;">Status</th>
            </tr>
          </thead>
          <tbody>
      `;

      dataToExport.forEach(row => {
        const color = row['Status'] === 'Passed' ? '#22c55e' : '#ef4444';
        htmlContent += `
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 6px;">${row['#']}</td>
            <td style="padding: 6px;"><strong>${row['Student']}</strong></td>
            <td style="padding: 6px;">${row['Quiz']}</td>
            <td style="padding: 6px;">${row['Date']}</td>
            <td style="padding: 6px;"><strong>${row['Score']}</strong></td>
            <td style="padding: 6px; color: ${color}; font-weight: 600;">${row['Status']}</td>
          </tr>
        `;
      });

      htmlContent += `
          </tbody>
        </table>
        <p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #64748b; font-size: 12px; text-align: center;">
          Generated by QuizMaster Admin Panel
        </p>
      `;

      container.innerHTML = htmlContent;
      document.body.appendChild(container);

      html2canvas(container, {
        scale: 2,
        useCORS: true,
        logging: false,
      }).then(canvas => {
        const link = document.createElement('a');
        link.download = `results-${new Date().toISOString().split('T')[0]}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        document.body.removeChild(container);
        toast.success(`Results exported as Image successfully! (${exportCount} records)`);
      }).catch(error => {
        console.error('Image export error:', error);
        toast.error('Failed to export as Image');
        document.body.removeChild(container);
      });
    } catch (error) {
      console.error('Image export error:', error);
      toast.error('Failed to export as Image');
    } finally {
      setExporting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-purple-200 dark:border-purple-800 rounded-full animate-spin border-t-purple-600 dark:border-t-purple-400"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <FaSpinner className="text-purple-600 dark:text-purple-400 text-2xl animate-pulse" />
            </div>
          </div>
          <p className="mt-4 text-gray-600 dark:text-gray-300 font-medium">Loading results...</p>
          <p className="text-sm text-gray-400 dark:text-gray-500">Preparing your quiz data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 dark:from-slate-900 dark:via-gray-900 dark:to-slate-800">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300/10 dark:bg-purple-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-300/10 dark:bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-300/5 dark:bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl blur-xl opacity-20 animate-pulse" />
            <div className="relative p-4 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl shadow-2xl shadow-purple-500/30">
              <FaChartBar className="text-white text-2xl" />
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500 bg-clip-text text-transparent">
              Quiz Results
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              View and analyze all quiz attempts
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 flex-wrap"
        >
          <div className="flex items-center gap-2 px-4 py-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
            <FaDatabase className="text-purple-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {filteredAttempts.length} Results
            </span>
          </div>
        </motion.div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        {[
          { label: 'Total Attempts', value: stats.totalAttempts, icon: FaUsers, color: 'blue', gradient: 'from-blue-500 to-indigo-500' },
          { label: 'Passed', value: stats.passed, icon: FaCheckCircle, color: 'emerald', gradient: 'from-emerald-500 to-teal-500' },
          { label: 'Failed', value: stats.failed, icon: FaTimesCircle, color: 'rose', gradient: 'from-rose-500 to-red-500' },
          { label: 'Pass Rate', value: `${stats.passRate}%`, icon: FaRocket, color: 'purple', gradient: 'from-purple-500 to-indigo-500' },
          { label: 'Avg Score', value: `${stats.averageScore}%`, icon: FaAward, color: 'amber', gradient: 'from-amber-500 to-orange-500' },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="group relative overflow-hidden rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              <div className="relative p-4 flex items-center gap-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="text-white text-xl" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-800 dark:text-gray-100 font-mono">
                    {stat.value}
                  </div>
                  <div className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="p-6 mb-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Quiz Topic
            </label>
            <select
              value={filters.quizTopic}
              onChange={(e) => handleFilterChange('quizTopic', e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-100/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300"
            >
              <option value="all">All Topics</option>
              {quizCategories.map((q) => (
                <option key={q.id} value={q.title}>{q.title}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Student Name
            </label>
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search student..."
                value={filters.studentName}
                onChange={(e) => handleFilterChange('studentName', e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-100/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Date Range
            </label>
            <select
              value={filters.dateRange}
              onChange={(e) => handleFilterChange('dateRange', e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-100/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Score Range
            </label>
            <select
              value={filters.scoreRange}
              onChange={(e) => handleFilterChange('scoreRange', e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-100/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300"
            >
              <option value="all">All Scores</option>
              <option value="90-100">90-100%</option>
              <option value="80-89">80-89%</option>
              <option value="70-79">70-79%</option>
              <option value="60-69">60-69%</option>
              <option value="below-60">Below 60%</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Status
            </label>
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-100/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300"
            >
              <option value="all">All</option>
              <option value="passed">✅ Passed</option>
              <option value="failed">❌ Failed</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Export Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-6 p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg"
      >
        <div className="flex items-center gap-2 mb-3">
          <div className="p-1.5 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
            <FaDownload className="text-purple-500" />
          </div>
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Export Results
          </h3>
          <FaInfoCircle className="text-gray-400 text-xs ml-2" />
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Click any format below to export filtered results.
          </span>
          {hasData && (
            <span className="text-xs bg-purple-100/50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-2 py-1 rounded-full border border-purple-200/50 dark:border-purple-700/30">
              {exportCount} records
            </span>
          )}
        </div>
        
        {!hasData ? (
          <div className="text-center py-8 bg-gray-50/50 dark:bg-gray-800/30 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700">
            <FaFileAlt className="text-4xl text-gray-300 dark:text-gray-600 mx-auto mb-2" />
            <p className="text-gray-500 dark:text-gray-400">No results available to export.</p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-3">
            {[
              { icon: FaFileCode, label: 'JSON', color: 'blue', onClick: exportJSON },
              { icon: FaFilePdf, label: 'PDF', color: 'red', onClick: exportPDF },
              { icon: FaFileWord, label: 'DOCX', color: 'blue', onClick: exportDOCX },
              { icon: FaFileCode, label: 'HTML', color: 'purple', onClick: exportHTML },
              { icon: FaFileAlt, label: 'TXT', color: 'gray', onClick: exportTXT },
              { icon: FaFileImage, label: 'Image', color: 'green', onClick: exportImage },
            ].map((item, index) => {
              const Icon = item.icon;
              const colorClasses = {
                blue: 'bg-blue-500 hover:bg-blue-600 shadow-blue-500/30',
                red: 'bg-red-500 hover:bg-red-600 shadow-red-500/30',
                purple: 'bg-purple-500 hover:bg-purple-600 shadow-purple-500/30',
                gray: 'bg-gray-500 hover:bg-gray-600 shadow-gray-500/30',
                green: 'bg-green-500 hover:bg-green-600 shadow-green-500/30',
              };
              return (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={item.onClick}
                  disabled={exporting}
                  className={`px-4 py-2.5 ${colorClasses[item.color]} text-white rounded-xl text-sm font-medium flex items-center gap-2 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <Icon />
                  {item.label}
                </motion.button>
              );
            })}
          </div>
        )}
        
        <AnimatePresence>
          {exporting && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 p-2 bg-gray-50/50 dark:bg-gray-800/30 rounded-xl"
            >
              <FaSpinner className="text-purple-500 animate-spin" />
              Exporting {exportCount} records...
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Data Preview Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <FaEye className="text-purple-500" />
            </div>
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Data Preview
            </h4>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              ({totalFilteredCount} records)
            </span>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowDataPreview(!showDataPreview)}
            className="text-sm text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1"
          >
            {showDataPreview ? 'Hide Preview' : 'Show Preview'}
            {showDataPreview ? <FaArrowUp className="text-xs" /> : <FaArrowDown className="text-xs" />}
          </motion.button>
        </div>

        <AnimatePresence>
          {showDataPreview && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="relative overflow-hidden rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-lg"
            >
              {/* Decorative Gradient Bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500" />

              <div className="overflow-x-auto">
                <div className="max-h-[400px] overflow-y-auto overflow-x-auto">
                  <table className="w-full text-sm min-w-[800px]">
                    <thead className="bg-gradient-to-r from-purple-50/50 to-indigo-50/50 dark:from-purple-900/10 dark:to-indigo-900/10 sticky top-0 z-10">
                      <tr>
                        {previewHeaders.map((header, index) => (
                          <th
                            key={index}
                            className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200/50 dark:divide-gray-700/50">
                      {previewPaginatedData.length === 0 ? (
                        <tr>
                          <td colSpan={previewHeaders.length} className="px-4 py-12 text-center text-gray-500 dark:text-gray-400">
                            <div className="flex flex-col items-center gap-2">
                              <FaSearch className="text-3xl text-gray-300 dark:text-gray-600" />
                              <p className="font-medium">No results found</p>
                              <p className="text-sm">Try adjusting your filters</p>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        previewPaginatedData.map((attempt, index) => {
                          const status = getStatusBadge(attempt.score);
                          const StatusIcon = status.icon;
                          
                          return (
                            <motion.tr
                              key={attempt.id || index}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.05 }}
                              whileHover={{ scale: 1.005 }}
                              onMouseEnter={() => setHoveredRow(index)}
                              onMouseLeave={() => setHoveredRow(null)}
                              className="hover:bg-purple-50/30 dark:hover:bg-purple-900/10 transition-all duration-300"
                            >
                              <td className="px-4 py-3">
                                <div className="flex items-center gap-2">
                                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white text-xs font-bold">
                                    {attempt.studentName?.charAt(0) || '?'}
                                  </div>
                                  <div>
                                    <div className="font-medium text-gray-800 dark:text-gray-200">
                                      {attempt.studentName || 'Unknown'}
                                    </div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">
                                      {attempt.studentEmail || 'N/A'}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-3">
                                <div className="text-gray-600 dark:text-gray-300">
                                  {attempt.quizTitle || 'N/A'}
                                </div>
                                <div className="text-xs text-gray-400 dark:text-gray-500">
                                  {formatTime(attempt.timeTaken)}
                                </div>
                              </td>
                              <td className="px-4 py-3 text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                <div className="flex items-center gap-2">
                                  <FaCalendar className="text-gray-400 text-xs" />
                                  {new Date(attempt.timestamp).toLocaleDateString()}
                                </div>
                              </td>
                              <td className="px-4 py-3 text-center">
                                <div className="flex flex-col items-center">
                                  <span className={`text-lg font-bold ${getScoreColor(attempt.score)}`}>
                                    {attempt.score || 0}%
                                  </span>
                                  <div className="w-12 h-1.5 bg-gray-200/50 dark:bg-gray-700/50 rounded-full overflow-hidden">
                                    <div
                                      className={`h-full rounded-full bg-gradient-to-r ${getScoreGradient(attempt.score)}`}
                                      style={{ width: `${Math.min(attempt.score || 0, 100)}%` }}
                                    />
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-3 text-center text-emerald-500 font-medium">
                                {attempt.passed || 0}
                              </td>
                              <td className="px-4 py-3 text-center text-rose-500 font-medium">
                                {attempt.failed || 0}
                              </td>
                              <td className="px-4 py-3 text-center">
                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${status.color}`}>
                                  <StatusIcon className="text-sm" />
                                  {status.text}
                                </span>
                              </td>
                            </motion.tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Preview Pagination */}
              {previewTotalPages > 1 && (
                <div className="flex flex-wrap items-center justify-between gap-4 px-4 py-3 border-t border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-purple-50/30 to-indigo-50/30 dark:from-purple-900/5 dark:to-indigo-900/5">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Showing {previewStartIndex + 1} to {Math.min(previewStartIndex + previewItemsPerPage, totalFilteredCount)} of {totalFilteredCount}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setPreviewPage(p => Math.max(1, p - 1))}
                      disabled={previewPage === 1}
                      className="px-3 py-1.5 rounded-lg bg-white/50 dark:bg-gray-800/50 hover:bg-purple-100/50 dark:hover:bg-purple-900/20 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 flex items-center gap-1"
                    >
                      <FaArrowLeft className="text-xs" />
                      Previous
                    </button>
                    <span className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold shadow-lg shadow-purple-500/30">
                      {previewPage} / {previewTotalPages}
                    </span>
                    <button
                      onClick={() => setPreviewPage(p => Math.min(previewTotalPages, p + 1))}
                      disabled={previewPage === previewTotalPages}
                      className="px-3 py-1.5 rounded-lg bg-white/50 dark:bg-gray-800/50 hover:bg-purple-100/50 dark:hover:bg-purple-900/20 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 flex items-center gap-1"
                    >
                      Next
                      <FaArrowRight className="text-xs" />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default AdminResults;