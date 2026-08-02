import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaFileExport, FaFilePdf, FaFileExcel, FaFileAlt,
  FaDownload, FaUsers, FaChartBar, FaList, FaCalendar,
  FaSpinner, FaFilter, FaTimes, FaCalendarAlt,
  FaUserGraduate, FaCheck, FaTimes as FaTimesIcon,
  FaSort, FaSortUp, FaSortDown, FaEye, FaCrown,
  FaRocket, FaChartLine, FaUserPlus, FaClock,
  FaArrowRight, FaArrowLeft, FaDatabase,
  FaArrowUp, FaArrowDown
} from 'react-icons/fa';
import { useAdmin } from '../../context/AdminContext.jsx';
import toast from 'react-hot-toast';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function AdminReports() {
  const { loadStudents, loadQuizAttempts, students, quizAttempts } = useAdmin();
  const [reportType, setReportType] = useState('students');
  const [exporting, setExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [showDataPreview, setShowDataPreview] = useState(true);
  const [previewPage, setPreviewPage] = useState(1);
  const [previewItemsPerPage] = useState(10);
  
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [dateError, setDateError] = useState('');
  
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [filters, setFilters] = useState({
    year: 'all',
    batch: 'all',
    performance: 'all',
    sortBy: 'name',
    sortDirection: 'asc'
  });

  // Get unique years and batches
  const getAvailableYears = () => {
    const years = new Set();
    students.forEach(s => {
      if (s.registeredAt) {
        const year = new Date(s.registeredAt).getFullYear();
        years.add(year);
      }
      if (s.batch) {
        const yearMatch = s.batch.match(/\d{4}/);
        if (yearMatch) years.add(parseInt(yearMatch[0]));
      }
    });
    return Array.from(years).sort((a, b) => b - a);
  };

  const getAvailableBatches = () => {
    const batches = new Set();
    students.forEach(s => {
      if (s.batch) batches.add(s.batch);
      if (s.batchLabel) batches.add(s.batchLabel);
    });
    return Array.from(batches).sort();
  };

  const getFilteredStudents = () => {
    let filtered = [...students];

    if (startDate || endDate) {
      filtered = filtered.filter(s => {
        const regDate = new Date(s.registeredAt);
        if (startDate && endDate) {
          const start = new Date(startDate);
          const end = new Date(endDate);
          end.setHours(23, 59, 59, 999);
          return regDate >= start && regDate <= end;
        } else if (startDate) {
          const start = new Date(startDate);
          return regDate >= start;
        } else if (endDate) {
          const end = new Date(endDate);
          end.setHours(23, 59, 59, 999);
          return regDate <= end;
        }
        return true;
      });
    }

    if (filters.year !== 'all') {
      filtered = filtered.filter(s => {
        if (s.registeredAt) {
          return new Date(s.registeredAt).getFullYear() === parseInt(filters.year);
        }
        return false;
      });
    }

    if (filters.batch !== 'all') {
      filtered = filtered.filter(s => 
        s.batch === filters.batch || s.batchLabel === filters.batch
      );
    }

    if (filters.performance !== 'all') {
      filtered = filtered.filter(s => {
        const history = s.quizHistory || [];
        const total = history.length;
        const passed = history.filter(h => h.score >= 90).length;
        const avgScore = total > 0 ? Math.round(history.reduce((acc, h) => acc + h.score, 0) / total) : 0;
        
        switch(filters.performance) {
          case 'passed': return passed > 0 && avgScore >= 90;
          case 'failed': return total > 0 && avgScore < 90;
          case 'excellent': return avgScore >= 90;
          case 'good': return avgScore >= 70 && avgScore < 90;
          case 'average': return avgScore >= 50 && avgScore < 70;
          case 'poor': return avgScore < 50;
          default: return true;
        }
      });
    }

    filtered.sort((a, b) => {
      let aVal, bVal;
      switch(filters.sortBy) {
        case 'name':
          aVal = a.fullName || '';
          bVal = b.fullName || '';
          break;
        case 'batch':
          aVal = a.batch || a.batchLabel || '';
          bVal = b.batch || b.batchLabel || '';
          break;
        case 'score':
          const aHistory = a.quizHistory || [];
          const bHistory = b.quizHistory || [];
          const aAvg = aHistory.length > 0 ? Math.round(aHistory.reduce((acc, h) => acc + h.score, 0) / aHistory.length) : 0;
          const bAvg = bHistory.length > 0 ? Math.round(bHistory.reduce((acc, h) => acc + h.score, 0) / bHistory.length) : 0;
          aVal = aAvg;
          bVal = bAvg;
          break;
        case 'quizzes':
          aVal = (a.quizHistory || []).length;
          bVal = (b.quizHistory || []).length;
          break;
        default:
          aVal = a.fullName || '';
          bVal = b.fullName || '';
      }
      
      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }
      
      if (aVal < bVal) return filters.sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return filters.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  };

  const getFilteredAttempts = () => {
    let filtered = [...quizAttempts];

    if (startDate || endDate) {
      filtered = filtered.filter(a => {
        const attemptDate = new Date(a.timestamp);
        if (startDate && endDate) {
          const start = new Date(startDate);
          const end = new Date(endDate);
          end.setHours(23, 59, 59, 999);
          return attemptDate >= start && attemptDate <= end;
        } else if (startDate) {
          const start = new Date(startDate);
          return attemptDate >= start;
        } else if (endDate) {
          const end = new Date(endDate);
          end.setHours(23, 59, 59, 999);
          return attemptDate <= end;
        }
        return true;
      });
    }

    if (filters.year !== 'all') {
      filtered = filtered.filter(a => {
        if (a.timestamp) {
          return new Date(a.timestamp).getFullYear() === parseInt(filters.year);
        }
        return false;
      });
    }

    if (filters.performance !== 'all') {
      filtered = filtered.filter(a => {
        const score = a.score || 0;
        switch(filters.performance) {
          case 'passed': return score >= 90;
          case 'failed': return score < 90;
          case 'excellent': return score >= 90;
          case 'good': return score >= 70 && score < 90;
          case 'average': return score >= 50 && score < 70;
          case 'poor': return score < 50;
          default: return true;
        }
      });
    }

    if (filters.batch !== 'all') {
      filtered = filtered.filter(a => {
        const student = students.find(s => s.id === a.studentId);
        return student && (student.batch === filters.batch || student.batchLabel === filters.batch);
      });
    }

    filtered.sort((a, b) => {
      let aVal, bVal;
      const studentA = students.find(s => s.id === a.studentId);
      const studentB = students.find(s => s.id === b.studentId);
      
      switch(filters.sortBy) {
        case 'name':
          aVal = studentA?.fullName || '';
          bVal = studentB?.fullName || '';
          break;
        case 'score':
          aVal = a.score || 0;
          bVal = b.score || 0;
          break;
        case 'date':
          aVal = new Date(a.timestamp);
          bVal = new Date(b.timestamp);
          break;
        default:
          aVal = studentA?.fullName || '';
          bVal = studentB?.fullName || '';
      }
      
      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }
      
      if (aVal < bVal) return filters.sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return filters.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  };

  const getPreviewData = () => {
    if (reportType === 'students') {
      return getFilteredStudents().map((s, index) => {
        const history = s.quizHistory || [];
        const total = history.length;
        const passed = history.filter(h => h.score >= 90).length;
        const avg = total > 0 ? Math.round(history.reduce((acc, h) => acc + h.score, 0) / total) : 0;
        
        return {
          '#': index + 1,
          'Name': s.fullName || '',
          'Email': s.email || '',
          'Phone': s.phone || '',
          'Batch': s.batchLabel || s.batch || 'N/A',
          'Status': s.isActive !== false ? 'Active' : 'Inactive',
          'Quizzes': total,
          'Passed': passed,
          'Avg Score': `${avg}%`
        };
      });
    } else if (reportType === 'results') {
      return getFilteredAttempts().map((a, index) => {
        const student = students.find(s => s.id === a.studentId);
        return {
          '#': index + 1,
          'Student': student?.fullName || 'Unknown',
          'Batch': student?.batchLabel || student?.batch || 'N/A',
          'Quiz': a.quizTitle || '',
          'Date': a.timestamp ? new Date(a.timestamp).toLocaleDateString() : '',
          'Score': `${a.score || 0}%`,
          'Time': a.timeTaken ? `${Math.floor(a.timeTaken / 60)}m ${a.timeTaken % 60}s` : '',
          'Status': (a.score || 0) >= 90 ? 'Passed' : 'Failed'
        };
      });
    } else if (reportType === 'leaderboard') {
      const filteredStudents = getFilteredStudents();
      const activeStudents = filteredStudents.filter(s => (s.quizHistory || []).length > 0);
      
      return activeStudents
        .map(s => {
          const history = s.quizHistory || [];
          const total = history.length;
          const passed = history.filter(h => h.score >= 90).length;
          const avg = total > 0 ? Math.round(history.reduce((acc, h) => acc + h.score, 0) / total) : 0;
          const fastestTime = history.length > 0 ? Math.min(...history.map(h => h.timeTaken || Infinity)) : Infinity;
          
          return {
            'Rank': 0,
            'Name': s.fullName || '',
            'Batch': s.batchLabel || s.batch || 'N/A',
            'Quizzes': total,
            'Passed': passed,
            'Avg Score': `${avg}%`,
            'Fastest': fastestTime === Infinity ? 'N/A' : `${Math.floor(fastestTime / 60)}m ${fastestTime % 60}s`,
            'Status': avg >= 90 ? '⭐ Elite' : avg >= 70 ? '🏅 Pro' : '📚 Learner'
          };
        })
        .sort((a, b) => parseInt(b['Avg Score']) - parseInt(a['Avg Score']))
        .map((item, index) => ({
          ...item,
          'Rank': index + 1
        }));
    } else {
      const filteredStudents = getFilteredStudents();
      const filteredAttempts = getFilteredAttempts();
      
      return [
        { 'Metric': 'Total Students', 'Value': filteredStudents.length },
        { 'Metric': 'Active Students', 'Value': filteredStudents.filter(s => s.isActive !== false).length },
        { 'Metric': 'Total Attempts', 'Value': filteredAttempts.length },
        { 'Metric': 'Passed Attempts', 'Value': filteredAttempts.filter(a => a.score >= 90).length },
        { 'Metric': 'Average Score', 'Value': `${filteredAttempts.length > 0 ? Math.round(filteredAttempts.reduce((acc, a) => acc + a.score, 0) / filteredAttempts.length) : 0}%` },
      ];
    }
  };

  const previewData = getPreviewData();
  const totalPreviewItems = previewData.length;
  const totalPreviewPages = Math.ceil(totalPreviewItems / previewItemsPerPage);
  const previewStartIndex = (previewPage - 1) * previewItemsPerPage;
  const previewPaginatedData = previewData.slice(previewStartIndex, previewStartIndex + previewItemsPerPage);

  const getPreviewHeaders = () => {
    if (previewData.length === 0) return [];
    return Object.keys(previewData[0]);
  };

  const previewHeaders = getPreviewHeaders();

  const validateDateRange = () => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      if (start > end) {
        setDateError('Start date must be before end date');
        return false;
      }
    }
    setDateError('');
    return true;
  };

  const clearAllFilters = () => {
    setStartDate('');
    setEndDate('');
    setDateError('');
    setShowDatePicker(false);
    setFilters({
      year: 'all',
      batch: 'all',
      performance: 'all',
      sortBy: 'name',
      sortDirection: 'asc'
    });
    setPreviewPage(1);
    toast.success('All filters cleared');
  };

  const generateCSV = (data, headers, filename) => {
    let csvContent = headers.join(',') + '\n';
    
    data.forEach(row => {
      const values = headers.map(header => {
        let value = row[header] || '';
        if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
          value = `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      });
      csvContent += values.join(',') + '\n';
    });

    return csvContent;
  };

  const downloadFile = (content, filename, mimeType = 'text/csv') => {
    const blob = new Blob([content], { type: `${mimeType};charset=utf-8;` });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const generatePDF = (data, title, headers, filename) => {
    try {
      const doc = new jsPDF('landscape', 'mm', 'a4');
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      doc.setFillColor(79, 70, 229);
      doc.rect(0, 0, pageWidth, 45, 'F');
      
      doc.setFontSize(20);
      doc.setTextColor(255, 255, 255);
      doc.text(title, pageWidth / 2, 18, { align: 'center' });

      doc.setFontSize(9);
      doc.setTextColor(220, 220, 255);
      doc.text(`Generated: ${new Date().toLocaleString()}`, pageWidth / 2, 28, { align: 'center' });

      let filterInfo = '';
      if (startDate && endDate) filterInfo += `Date: ${startDate} to ${endDate} | `;
      if (filters.year !== 'all') filterInfo += `Year: ${filters.year} | `;
      if (filters.batch !== 'all') filterInfo += `Batch: ${filters.batch} | `;
      if (filters.performance !== 'all') filterInfo += `Performance: ${filters.performance}`;
      if (filterInfo) {
        doc.setTextColor(200, 200, 230);
        doc.text(`Filters: ${filterInfo}`, pageWidth / 2, 36, { align: 'center' });
      }

      const tableData = data.map(row => headers.map(header => String(row[header] || '')));
      
      doc.autoTable({
        startY: 50,
        head: [headers],
        body: tableData,
        theme: 'striped',
        headStyles: {
          fillColor: [79, 70, 229],
          textColor: [255, 255, 255],
          fontSize: 8,
          fontStyle: 'bold',
        },
        bodyStyles: {
          fontSize: 7,
        },
        margin: { left: 20, right: 20 },
        didDrawPage: function(data) {
          const pageCount = doc.internal.getNumberOfPages();
          doc.setFontSize(7);
          doc.setTextColor(150, 150, 150);
          doc.text(
            `Page ${data.pageNumber} of ${pageCount}`,
            pageWidth / 2,
            pageHeight - 8,
            { align: 'center' }
          );
        }
      });

      doc.save(filename);
      return true;
    } catch (error) {
      console.error('PDF generation error:', error);
      throw error;
    }
  };

  const exportStudents = (format) => {
    setExporting(true);
    setExportProgress(0);

    setTimeout(() => {
      try {
        const filteredStudents = getFilteredStudents();
        setExportProgress(30);

        if (!filteredStudents || filteredStudents.length === 0) {
          toast.warning('No students found matching the selected filters');
          setExporting(false);
          return;
        }

        const data = filteredStudents.map((s, index) => {
          const history = s.quizHistory || [];
          const total = history.length;
          const passed = history.filter(h => h.score >= 90).length;
          const avg = total > 0 ? Math.round(history.reduce((acc, h) => acc + h.score, 0) / total) : 0;
          
          return {
            '#': index + 1,
            'Name': s.fullName || '',
            'Email': s.email || '',
            'Phone': s.phone || '',
            'Batch': s.batchLabel || s.batch || 'N/A',
            'Status': s.isActive !== false ? 'Active' : 'Inactive',
            'Registered': s.registeredAt ? new Date(s.registeredAt).toLocaleDateString() : '',
            'Quizzes': total,
            'Passed': passed,
            'Failed': total - passed,
            'Avg Score': `${avg}%`
          };
        });

        setExportProgress(60);

        const filterStr = getFilterString();
        const filenamePrefix = `students${filterStr}-${new Date().toISOString().split('T')[0]}`;

        if (format === 'pdf') {
          const pdfHeaders = ['#', 'Name', 'Email', 'Phone', 'Batch', 'Status', 'Quizzes', 'Passed', 'Avg Score'];
          const result = generatePDF(data, `Student List ${getFilterTitle()}`, pdfHeaders, `${filenamePrefix}.pdf`);
          if (result) {
            toast.success(`Exported ${data.length} students successfully!`);
          }
        } else if (format === 'csv') {
          const csvHeaders = ['#', 'Name', 'Email', 'Phone', 'Batch', 'Status', 'Registered', 'Quizzes', 'Passed', 'Failed', 'Avg Score'];
          const csvContent = generateCSV(data, csvHeaders, 'students');
          downloadFile(csvContent, `${filenamePrefix}.csv`, 'text/csv');
          toast.success(`Exported ${data.length} students successfully!`);
        } else {
          const jsonContent = JSON.stringify(data, null, 2);
          downloadFile(jsonContent, `${filenamePrefix}.json`, 'application/json');
          toast.success(`Exported ${data.length} students successfully!`);
        }

        setExportProgress(100);
        setTimeout(() => setExporting(false), 500);
      } catch (error) {
        console.error('Export error:', error);
        toast.error('Failed to export data: ' + error.message);
        setExporting(false);
      }
    }, 500);
  };

  const exportResults = (format) => {
    setExporting(true);
    setExportProgress(0);

    setTimeout(() => {
      try {
        const filteredAttempts = getFilteredAttempts();
        setExportProgress(30);

        if (!filteredAttempts || filteredAttempts.length === 0) {
          toast.warning('No quiz attempts found matching the selected filters');
          setExporting(false);
          return;
        }

        const data = filteredAttempts.map((a, index) => {
          const student = students.find(s => s.id === a.studentId);
          return {
            '#': index + 1,
            'Student': student?.fullName || 'Unknown',
            'Batch': student?.batchLabel || student?.batch || 'N/A',
            'Quiz': a.quizTitle || '',
            'Date': a.timestamp ? new Date(a.timestamp).toLocaleDateString() : '',
            'Score': `${a.score || 0}%`,
            'Passed': a.passed || 0,
            'Failed': a.failed || 0,
            'Total': a.total || 0,
            'Time': a.timeTaken ? `${Math.floor(a.timeTaken / 60)}m ${a.timeTaken % 60}s` : '',
            'Status': (a.score || 0) >= 90 ? 'Passed' : 'Failed'
          };
        });

        setExportProgress(60);

        const filterStr = getFilterString();
        const filenamePrefix = `results${filterStr}-${new Date().toISOString().split('T')[0]}`;

        if (format === 'pdf') {
          const pdfHeaders = ['#', 'Student', 'Batch', 'Quiz', 'Date', 'Score', 'Time', 'Status'];
          generatePDF(data, `Quiz Results ${getFilterTitle()}`, pdfHeaders, `${filenamePrefix}.pdf`);
          toast.success(`Exported ${data.length} results successfully!`);
        } else if (format === 'csv') {
          const csvHeaders = ['#', 'Student', 'Batch', 'Quiz', 'Date', 'Score', 'Passed', 'Failed', 'Total', 'Time', 'Status'];
          const csvContent = generateCSV(data, csvHeaders, 'results');
          downloadFile(csvContent, `${filenamePrefix}.csv`, 'text/csv');
          toast.success(`Exported ${data.length} results successfully!`);
        } else {
          const jsonContent = JSON.stringify(data, null, 2);
          downloadFile(jsonContent, `${filenamePrefix}.json`, 'application/json');
          toast.success(`Exported ${data.length} results successfully!`);
        }

        setExportProgress(100);
        setTimeout(() => setExporting(false), 500);
      } catch (error) {
        console.error('Export error:', error);
        toast.error('Failed to export data: ' + error.message);
        setExporting(false);
      }
    }, 500);
  };

  const exportLeaderboard = (format) => {
    setExporting(true);
    setExportProgress(0);

    setTimeout(() => {
      try {
        const filteredStudents = getFilteredStudents();
        const activeStudents = filteredStudents.filter(s => (s.quizHistory || []).length > 0);
        
        setExportProgress(30);

        if (activeStudents.length === 0) {
          toast.warning('No students with quiz history found matching the selected filters');
          setExporting(false);
          return;
        }

        const leaderboardData = activeStudents
          .map(s => {
            const history = s.quizHistory || [];
            const total = history.length;
            const passed = history.filter(h => h.score >= 90).length;
            const avg = total > 0 ? Math.round(history.reduce((acc, h) => acc + h.score, 0) / total) : 0;
            const fastestTime = history.length > 0 ? Math.min(...history.map(h => h.timeTaken || Infinity)) : Infinity;
            
            return {
              'Rank': 0,
              'Name': s.fullName || '',
              'Batch': s.batchLabel || s.batch || 'N/A',
              'Quizzes': total,
              'Passed': passed,
              'Failed': total - passed,
              'Avg Score': `${avg}%`,
              'Fastest': fastestTime === Infinity ? 'N/A' : `${Math.floor(fastestTime / 60)}m ${fastestTime % 60}s`,
              'Status': avg >= 90 ? '⭐ Elite' : avg >= 70 ? '🏅 Pro' : '📚 Learner'
            };
          })
          .sort((a, b) => parseInt(b['Avg Score']) - parseInt(a['Avg Score']))
          .map((item, index) => ({
            ...item,
            'Rank': index + 1
          }));

        setExportProgress(60);

        const filterStr = getFilterString();
        const filenamePrefix = `leaderboard${filterStr}-${new Date().toISOString().split('T')[0]}`;

        if (format === 'pdf') {
          const pdfHeaders = ['Rank', 'Name', 'Batch', 'Quizzes', 'Passed', 'Avg Score', 'Fastest', 'Status'];
          generatePDF(leaderboardData, `Leaderboard ${getFilterTitle()}`, pdfHeaders, `${filenamePrefix}.pdf`);
          toast.success('Leaderboard exported successfully!');
        } else if (format === 'csv') {
          const csvHeaders = ['Rank', 'Name', 'Batch', 'Quizzes', 'Passed', 'Failed', 'Avg Score', 'Fastest', 'Status'];
          const csvContent = generateCSV(leaderboardData, csvHeaders, 'leaderboard');
          downloadFile(csvContent, `${filenamePrefix}.csv`, 'text/csv');
          toast.success('Leaderboard exported successfully!');
        } else {
          const jsonContent = JSON.stringify(leaderboardData, null, 2);
          downloadFile(jsonContent, `${filenamePrefix}.json`, 'application/json');
          toast.success('Leaderboard exported successfully!');
        }

        setExportProgress(100);
        setTimeout(() => setExporting(false), 500);
      } catch (error) {
        console.error('Export error:', error);
        toast.error('Failed to export data: ' + error.message);
        setExporting(false);
      }
    }, 500);
  };

  const exportAnalytics = (format) => {
    setExporting(true);
    setExportProgress(0);

    setTimeout(() => {
      try {
        const filteredStudents = getFilteredStudents();
        const filteredAttempts = getFilteredAttempts();
        
        setExportProgress(30);

        const totalStudents = filteredStudents.length;
        const activeStudents = filteredStudents.filter(s => s.isActive !== false).length;
        const totalAttempts = filteredAttempts.length;
        const passed = filteredAttempts.filter(a => a.score >= 90).length;
        const avgScore = totalAttempts > 0 
          ? Math.round(filteredAttempts.reduce((acc, a) => acc + a.score, 0) / totalAttempts)
          : 0;

        const summaryData = [
          { 'Metric': 'Filters Applied', 'Value': getFilterTitle() || 'All Data' },
          { 'Metric': 'Date Range', 'Value': startDate && endDate ? `${startDate} to ${endDate}` : 'All Dates' },
          { 'Metric': 'Total Students', 'Value': totalStudents },
          { 'Metric': 'Active Students', 'Value': activeStudents },
          { 'Metric': 'Inactive Students', 'Value': totalStudents - activeStudents },
          { 'Metric': 'Total Attempts', 'Value': totalAttempts },
          { 'Metric': 'Passed Attempts', 'Value': passed },
          { 'Metric': 'Failed Attempts', 'Value': totalAttempts - passed },
          { 'Metric': 'Average Score', 'Value': `${avgScore}%` },
          { 'Metric': 'Pass Rate', 'Value': `${totalAttempts > 0 ? Math.round((passed / totalAttempts) * 100) : 0}%` },
        ];

        const studentDetails = filteredStudents.map(s => ({
          'Name': s.fullName || '',
          'Email': s.email || '',
          'Batch': s.batchLabel || s.batch || 'N/A',
          'Quizzes Taken': (s.quizHistory || []).length,
          'Avg Score': `${(s.quizHistory || []).length > 0 
            ? Math.round((s.quizHistory || []).reduce((acc, h) => acc + h.score, 0) / (s.quizHistory || []).length)
            : 0}%`
        }));

        setExportProgress(60);

        const filterStr = getFilterString();
        const filenamePrefix = `analytics${filterStr}-${new Date().toISOString().split('T')[0]}`;

        if (format === 'pdf') {
          const doc = new jsPDF('portrait', 'mm', 'a4');
          const pageWidth = doc.internal.pageSize.getWidth();
          
          doc.setFillColor(79, 70, 229);
          doc.rect(0, 0, pageWidth, 40, 'F');
          
          doc.setFontSize(18);
          doc.setTextColor(255, 255, 255);
          doc.text(`Analytics Summary ${getFilterTitle()}`, pageWidth / 2, 18, { align: 'center' });
          
          doc.setFontSize(9);
          doc.setTextColor(220, 220, 255);
          doc.text(`Generated: ${new Date().toLocaleString()}`, pageWidth / 2, 28, { align: 'center' });
          
          doc.autoTable({
            startY: 45,
            head: [['Metric', 'Value']],
            body: summaryData.map(d => [d.Metric, d.Value]),
            theme: 'striped',
            headStyles: {
              fillColor: [79, 70, 229],
              textColor: [255, 255, 255],
              fontSize: 10,
              fontStyle: 'bold',
            },
            bodyStyles: {
              fontSize: 9,
            },
            margin: { left: 20, right: 20 },
          });
          
          doc.addPage();
          doc.setFillColor(79, 70, 229);
          doc.rect(0, 0, pageWidth, 30, 'F');
          
          doc.setFontSize(16);
          doc.setTextColor(255, 255, 255);
          doc.text('Student Details', pageWidth / 2, 16, { align: 'center' });
          
          doc.autoTable({
            startY: 35,
            head: [['Name', 'Email', 'Batch', 'Quizzes Taken', 'Avg Score']],
            body: studentDetails.map(s => [s.Name, s.Email, s.Batch, s['Quizzes Taken'], s['Avg Score']]),
            theme: 'striped',
            headStyles: {
              fillColor: [79, 70, 229],
              textColor: [255, 255, 255],
              fontSize: 8,
              fontStyle: 'bold',
            },
            bodyStyles: {
              fontSize: 7,
            },
            margin: { left: 20, right: 20 },
          });
          
          doc.save(`${filenamePrefix}.pdf`);
          toast.success('Analytics exported successfully!');
        } else if (format === 'csv') {
          let csvContent = 'ANALYTICS SUMMARY\n';
          summaryData.forEach(d => {
            csvContent += `${d.Metric},${d.Value}\n`;
          });
          csvContent += '\n\nSTUDENT DETAILS\n';
          csvContent += 'Name,Email,Batch,Quizzes Taken,Avg Score\n';
          studentDetails.forEach(s => {
            csvContent += `${s.Name},${s.Email},${s.Batch},${s['Quizzes Taken']},${s['Avg Score']}\n`;
          });

          downloadFile(csvContent, `${filenamePrefix}.csv`, 'text/csv');
          toast.success('Analytics exported successfully!');
        } else {
          const jsonContent = JSON.stringify({ summary: summaryData, details: studentDetails }, null, 2);
          downloadFile(jsonContent, `${filenamePrefix}.json`, 'application/json');
          toast.success('Analytics exported successfully!');
        }

        setExportProgress(100);
        setTimeout(() => setExporting(false), 500);
      } catch (error) {
        console.error('Export error:', error);
        toast.error('Failed to export data: ' + error.message);
        setExporting(false);
      }
    }, 500);
  };

  const handleExport = (format) => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      if (start > end) {
        toast.error('Start date must be before end date');
        return;
      }
    }
    
    switch (reportType) {
      case 'students':
        exportStudents(format);
        break;
      case 'results':
        exportResults(format);
        break;
      case 'leaderboard':
        exportLeaderboard(format);
        break;
      case 'analytics':
        exportAnalytics(format);
        break;
      default:
        toast.error('Invalid report type');
    }
  };

  const getFilterString = () => {
    let parts = [];
    if (startDate && endDate) parts.push(`-${startDate}_to_${endDate}`);
    if (filters.year !== 'all') parts.push(`-Year${filters.year}`);
    if (filters.batch !== 'all') parts.push(`-Batch${filters.batch.replace(/\s/g, '')}`);
    if (filters.performance !== 'all') parts.push(`-${filters.performance}`);
    return parts.join('') || '';
  };

  const getFilterTitle = () => {
    let parts = [];
    if (startDate && endDate) parts.push(`Date: ${startDate} to ${endDate}`);
    if (filters.year !== 'all') parts.push(`Year: ${filters.year}`);
    if (filters.batch !== 'all') parts.push(`Batch: ${filters.batch}`);
    if (filters.performance !== 'all') parts.push(`Performance: ${filters.performance}`);
    return parts.length > 0 ? `(${parts.join(' | ')})` : '';
  };

  const reportOptions = [
    { id: 'students', label: 'Student List', icon: FaUsers, description: 'Export all registered students', color: 'blue' },
    { id: 'results', label: 'Quiz Results', icon: FaChartBar, description: 'Export all quiz attempts', color: 'green' },
    { id: 'leaderboard', label: 'Leaderboard', icon: FaCrown, description: 'Export student rankings', color: 'yellow' },
    { id: 'analytics', label: 'Analytics Summary', icon: FaChartLine, description: 'Export platform analytics', color: 'purple' },
  ];

  const getReportStats = () => {
    const filteredStudents = getFilteredStudents();
    const filteredAttempts = getFilteredAttempts();

    switch (reportType) {
      case 'students':
        return `${filteredStudents.length} students`;
      case 'results':
        return `${filteredAttempts.length} attempts`;
      case 'leaderboard':
        return `${filteredStudents.filter(s => (s.quizHistory || []).length > 0).length} active students`;
      case 'analytics':
        return 'Platform summary';
      default:
        return '';
    }
  };

  const performanceOptions = [
    { value: 'all', label: 'All Performance' },
    { value: 'excellent', label: '⭐ Excellent (≥90%)' },
    { value: 'good', label: '👍 Good (70-89%)' },
    { value: 'average', label: '📊 Average (50-69%)' },
    { value: 'poor', label: '📚 Poor (<50%)' },
    { value: 'passed', label: '✅ Passed' },
    { value: 'failed', label: '❌ Failed' },
  ];

  const sortOptions = [
    { value: 'name', label: 'Name' },
    { value: 'batch', label: 'Batch' },
    { value: 'score', label: 'Score' },
    { value: 'quizzes', label: 'Quizzes Taken' },
    { value: 'date', label: 'Date' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent flex items-center gap-3">
            <FaFileExport className="text-purple-500" />
            Reports
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Export and manage your data with powerful filtering options
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700"
        >
          <FaDatabase className="text-purple-500" />
          <span className="text-sm text-gray-600 dark:text-gray-300">
            {students?.length || 0} Students • {quizAttempts?.length || 0} Attempts
          </span>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Report Type Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glassmorphism card-shadow rounded-2xl p-6 bg-white dark:bg-gray-800 shadow-xl"
        >
          <div className="flex items-center gap-2 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-blue-500 rounded-full" />
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Report Type
            </h3>
          </div>

          <div className="space-y-3">
            {reportOptions.map((option) => {
              const Icon = option.icon;
              const isActive = reportType === option.id;
              
              return (
                <motion.button
                  key={option.id}
                  onClick={() => setReportType(option.id)}
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 border-2 ${
                    isActive 
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 shadow-md' 
                      : 'border-transparent hover:bg-gray-50 dark:hover:bg-gray-700/50'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${
                    isActive 
                      ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400' 
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                  }`}>
                    <Icon className="text-lg" />
                  </div>
                  <div className="flex-1 text-left">
                    <span className={`font-medium ${
                      isActive ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'
                    }`}>
                      {option.label}
                    </span>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      {option.description}
                    </p>
                  </div>
                  {isActive && (
                    <motion.div 
                      layoutId="activeTab"
                      className="w-2 h-10 bg-gradient-to-b from-purple-500 to-blue-500 rounded-full"
                    />
                  )}
                </motion.button>
              );
            })}
          </div>

          <motion.div 
            className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl border border-purple-200 dark:border-purple-800"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <FaDatabase className="text-purple-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {getReportStats()}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Ready to export
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Export Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glassmorphism card-shadow rounded-2xl p-6 bg-white dark:bg-gray-800 shadow-xl lg:col-span-2"
        >
          <div className="flex items-center gap-2 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-blue-500 rounded-full" />
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Export Options
            </h3>
            {exporting && (
              <span className="ml-auto text-sm text-purple-500 animate-pulse">
                Exporting...
              </span>
            )}
          </div>

          {/* Filters Section */}
          <motion.div 
            className="mb-6 p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-800/30 rounded-xl border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              >
                <FaFilter className={`text-purple-500 transition-transform ${showAdvancedFilters ? 'rotate-180' : ''}`} />
                {showAdvancedFilters ? 'Hide Filters' : 'Show Filters'}
                {getFilterTitle() && (
                  <span className="px-2 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs">
                    Active
                  </span>
                )}
              </motion.button>

              {(startDate || endDate || filters.year !== 'all' || filters.batch !== 'all' || filters.performance !== 'all') && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={clearAllFilters}
                  className="text-sm text-red-500 hover:text-red-600 transition-colors flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <FaTimesIcon className="text-xs" />
                  Clear All
                </motion.button>
              )}
            </div>

            <AnimatePresence>
              {showAdvancedFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4 overflow-hidden"
                >
                  {/* Date Range */}
                  <div className="flex flex-wrap items-end gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-1">
                        <FaCalendarAlt className="text-purple-500 text-xs" />
                        Date Range
                      </label>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setShowDatePicker(!showDatePicker)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 transition-all ${
                          startDate || endDate 
                            ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-md hover:shadow-lg' 
                            : 'bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-purple-400'
                        }`}
                      >
                        <FaCalendarAlt />
                        {startDate || endDate ? 'Filtered by Date' : 'Select Date Range'}
                        {(startDate || endDate) && (
                          <span className="ml-1 w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                        )}
                      </motion.button>
                    </div>

                    <AnimatePresence>
                      {showDatePicker && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="flex flex-wrap items-end gap-3 p-3 bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 shadow-lg"
                        >
                          <div>
                            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                              Start Date
                            </label>
                            <input
                              type="date"
                              value={startDate}
                              onChange={(e) => setStartDate(e.target.value)}
                              className="px-3 py-1.5 bg-gray-50 dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm border border-gray-300 dark:border-gray-600"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                              End Date
                            </label>
                            <input
                              type="date"
                              value={endDate}
                              onChange={(e) => setEndDate(e.target.value)}
                              className="px-3 py-1.5 bg-gray-50 dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm border border-gray-300 dark:border-gray-600"
                            />
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              if (validateDateRange()) {
                                setShowDatePicker(false);
                                toast.success('Date filter applied');
                              }
                            }}
                            className="px-4 py-1.5 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-lg font-medium transition-all shadow-md"
                          >
                            Apply
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              setStartDate('');
                              setEndDate('');
                              setShowDatePicker(false);
                              setDateError('');
                            }}
                            className="px-3 py-1.5 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-lg text-sm font-medium transition-colors"
                          >
                            Clear
                          </motion.button>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {dateError && (
                      <p className="text-sm text-red-500 w-full">{dateError}</p>
                    )}
                  </div>

                  {/* Advanced Filters Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      {
                        label: 'Year',
                        value: filters.year,
                        onChange: (e) => setFilters({ ...filters, year: e.target.value }),
                        options: [{ value: 'all', label: 'All Years' }, ...getAvailableYears().map(y => ({ value: y, label: y }))]
                      },
                      {
                        label: 'Batch',
                        value: filters.batch,
                        onChange: (e) => setFilters({ ...filters, batch: e.target.value }),
                        options: [{ value: 'all', label: 'All Batches' }, ...getAvailableBatches().map(b => ({ value: b, label: b }))]
                      },
                      {
                        label: 'Performance',
                        value: filters.performance,
                        onChange: (e) => setFilters({ ...filters, performance: e.target.value }),
                        options: performanceOptions
                      }
                    ].map((field, index) => (
                      <div key={index}>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          {field.label}
                        </label>
                        <select
                          value={field.value}
                          onChange={field.onChange}
                          className="w-full px-4 py-2 bg-white dark:bg-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm border-2 border-gray-300 dark:border-gray-600 hover:border-purple-400 transition-colors"
                        >
                          {field.options.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </select>
                      </div>
                    ))}
                  </div>

                  {/* Sorting */}
                  <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-gray-200 dark:border-gray-700">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Sort By
                      </label>
                      <select
                        value={filters.sortBy}
                        onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                        className="px-4 py-2 bg-white dark:bg-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm border-2 border-gray-300 dark:border-gray-600 hover:border-purple-400 transition-colors"
                      >
                        {sortOptions.map(opt => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    </div>
                    <div className="mt-6">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setFilters({ ...filters, sortDirection: filters.sortDirection === 'asc' ? 'desc' : 'asc' })}
                        className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-xl text-sm font-medium flex items-center gap-2 transition-all"
                      >
                        {filters.sortDirection === 'asc' ? <FaSortUp className="text-purple-500" /> : <FaSortDown className="text-purple-500" />}
                        {filters.sortDirection === 'asc' ? 'Ascending' : 'Descending'}
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Export Progress */}
          <AnimatePresence>
            {exporting && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-4 p-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl border border-purple-200 dark:border-purple-800"
              >
                <div className="flex items-center gap-3 mb-2">
                  <FaSpinner className="text-purple-500 text-xl animate-spin" />
                  <span className="font-medium text-gray-700 dark:text-gray-300">Exporting data...</span>
                  <span className="ml-auto text-sm font-semibold text-purple-600 dark:text-purple-400">
                    {exportProgress}%
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${exportProgress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Export Format Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {[
              { 
                format: 'csv', 
                icon: FaFileExcel, 
                label: 'CSV', 
                desc: 'Spreadsheet Format',
                color: 'green',
                bg: 'from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20',
                border: 'border-green-200 dark:border-green-800',
                hoverBorder: 'hover:border-green-500'
              },
              { 
                format: 'pdf', 
                icon: FaFilePdf, 
                label: 'PDF', 
                desc: 'Portable Document',
                color: 'red',
                bg: 'from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20',
                border: 'border-red-200 dark:border-red-800',
                hoverBorder: 'hover:border-red-500'
              },
              { 
                format: 'json', 
                icon: FaFileAlt, 
                label: 'JSON', 
                desc: 'Structured Data',
                color: 'blue',
                bg: 'from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20',
                border: 'border-blue-200 dark:border-blue-800',
                hoverBorder: 'hover:border-blue-500'
              }
            ].map(({ format, icon: Icon, label, desc, color, bg, border, hoverBorder }) => (
              <motion.button
                key={format}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleExport(format)}
                disabled={exporting}
                className={`p-6 rounded-xl bg-gradient-to-br ${bg} border-2 ${border} ${hoverBorder} transition-all duration-300 text-center disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md`}
              >
                <Icon className={`text-${color}-500 text-4xl mx-auto mb-2`} />
                <div className="font-semibold text-gray-800 dark:text-gray-200">{label}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{desc}</div>
              </motion.button>
            ))}
          </div>

          {/* Export Info */}
          <motion.div 
            className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl border border-purple-200 dark:border-purple-800"
          >
            <div className="flex items-center gap-3 text-sm text-purple-700 dark:text-purple-300">
              <div className="p-1.5 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <FaDownload className="text-purple-500" />
              </div>
              <span>
                {exporting ? (
                  <span className="flex items-center gap-2">
                    <FaSpinner className="animate-spin" />
                    Generating your export file...
                  </span>
                ) : (
                  `Click any format above to export ${reportOptions.find(r => r.id === reportType)?.label}`
                )}
              </span>
            </div>
          </motion.div>

          {/* Data Preview Section */}
          <motion.div className="mt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <FaEye className="text-purple-500" />
                </div>
                <h4 className="font-semibold text-gray-700 dark:text-gray-300">
                  Data Preview
                </h4>
                <span className="px-2 py-0.5 bg-gray-200 dark:bg-gray-700 rounded-full text-xs text-gray-600 dark:text-gray-400">
                  {totalPreviewItems} records
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
                >
                  {previewData.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600">
                      <div className="text-5xl mb-3">📊</div>
                      <p className="font-medium text-gray-600 dark:text-gray-300">No data found</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Try adjusting your filters</p>
                    </div>
                  ) : (
                    <>
                      <div className="border-2 border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm">
                        <div className="max-h-[400px] overflow-y-auto overflow-x-auto">
                          <table className="w-full text-sm min-w-[800px]">
                            <thead className="bg-gradient-to-r from-purple-500 to-purple-600 sticky top-0 z-10">
                              <tr>
                                {previewHeaders.map((header, index) => (
                                  <th
                                    key={index}
                                    className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider whitespace-nowrap"
                                  >
                                    {header}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
                              {previewPaginatedData.map((row, rowIndex) => (
                                <motion.tr
                                  key={rowIndex}
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: rowIndex * 0.05 }}
                                  className="hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
                                >
                                  {previewHeaders.map((header, colIndex) => (
                                    <td key={colIndex} className="px-4 py-2.5 text-gray-700 dark:text-gray-300 whitespace-nowrap">
                                      {row[header] || '—'}
                                    </td>
                                  ))}
                                </motion.tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-2 text-xs text-gray-400 dark:text-gray-500">
                        <div className="flex items-center gap-2">
                          <span className="inline-block px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">↔</span>
                          <span>Scroll horizontally</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="inline-block px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">↕</span>
                          <span>Scroll vertically</span>
                        </div>
                      </div>

                      {totalPreviewPages > 1 && (
                        <div className="flex items-center justify-between mt-4 text-sm">
                          <span className="text-gray-500 dark:text-gray-400">
                            Showing {previewStartIndex + 1} to {Math.min(previewStartIndex + previewItemsPerPage, totalPreviewItems)} of {totalPreviewItems}
                          </span>
                          <div className="flex gap-2">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setPreviewPage(p => Math.max(1, p - 1))}
                              disabled={previewPage === 1}
                              className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-1"
                            >
                              <FaArrowLeft className="text-xs" />
                              Previous
                            </motion.button>
                            <span className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold shadow-md">
                              {previewPage} / {totalPreviewPages}
                            </span>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setPreviewPage(p => Math.min(totalPreviewPages, p + 1))}
                              disabled={previewPage === totalPreviewPages}
                              className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-1"
                            >
                              Next
                              <FaArrowRight className="text-xs" />
                            </motion.button>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default AdminReports;