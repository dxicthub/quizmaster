import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaSearch, FaFilter, FaCalendar, FaDownload,
  FaUserGraduate, FaUserShield, FaBook, FaUsers,
  FaCheckCircle, FaTimesCircle, FaHistory, FaFileAlt,
  FaFilePdf, FaFileWord, FaFileCode, FaFileImage,
  FaFile, FaInfoCircle, FaCalendarAlt, FaTimes,
  FaEye, FaSort, FaSortUp, FaSortDown,
  FaArrowUp, FaArrowDown, FaArrowLeft, FaArrowRight,
  FaSpinner, FaDatabase, FaClock, FaFire,
  FaRocket, FaChartLine, FaLightbulb
} from 'react-icons/fa';
import { useAdmin } from '../../context/AdminContext.jsx';
import toast from 'react-hot-toast';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import html2canvas from 'html2canvas';

function AdminActivity() {
  const { loadActivityLogs, activityLogs } = useAdmin();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [hoveredRow, setHoveredRow] = useState(null);
  const logRef = useRef(null);
  
  // Date range state
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [dateError, setDateError] = useState('');
  
  // Data preview state
  const [showDataPreview, setShowDataPreview] = useState(true);
  const [previewPage, setPreviewPage] = useState(1);
  const [previewItemsPerPage] = useState(10);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setLoading(true);
    try {
      loadActivityLogs();
    } catch (error) {
      console.error('Error loading activity logs:', error);
      toast.error('Failed to load activity logs');
    } finally {
      setLoading(false);
    }
  };

  const getActivityIcon = (action) => {
    const icons = {
      'Admin Login': <FaUserShield className="text-purple-400" />,
      'Admin Logout': <FaUserShield className="text-red-400" />,
      'Student Login': <FaUsers className="text-blue-400" />,
      'Student Logout': <FaUsers className="text-gray-400" />,
      'Student Registered': <FaUsers className="text-emerald-400" />,
      'Quiz Started': <FaBook className="text-amber-400" />,
      'Quiz Submitted': <FaFileAlt className="text-indigo-400" />,
      'Quiz Passed': <FaCheckCircle className="text-emerald-400" />,
      'Quiz Failed': <FaTimesCircle className="text-red-400" />,
      'Student Archived': <FaUsers className="text-orange-400" />,
      'Student Restored': <FaUsers className="text-emerald-400" />,
      'Quiz Created': <FaBook className="text-purple-400" />,
      'Quiz Edited': <FaBook className="text-indigo-400" />,
      'Quiz Deleted': <FaBook className="text-red-400" />,
    };
    return icons[action] || <FaHistory className="text-gray-400" />;
  };

  const getActivityColor = (action) => {
    if (action.includes('Login')) return 'bg-gradient-to-r from-blue-50/50 to-blue-100/50 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200/50 dark:border-blue-700/30';
    if (action.includes('Logout')) return 'bg-gradient-to-r from-gray-50/50 to-gray-100/50 dark:from-gray-800/30 dark:to-gray-700/30 border-gray-200/50 dark:border-gray-700/30';
    if (action.includes('Passed') || action.includes('Restored') || action.includes('Registered')) 
      return 'bg-gradient-to-r from-emerald-50/50 to-emerald-100/50 dark:from-emerald-900/20 dark:to-emerald-800/20 border-emerald-200/50 dark:border-emerald-700/30';
    if (action.includes('Failed') || action.includes('Deleted') || action.includes('Archived')) 
      return 'bg-gradient-to-r from-red-50/50 to-red-100/50 dark:from-red-900/20 dark:to-red-800/20 border-red-200/50 dark:border-red-700/30';
    if (action.includes('Created') || action.includes('Edited')) 
      return 'bg-gradient-to-r from-purple-50/50 to-purple-100/50 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200/50 dark:border-purple-700/30';
    return 'bg-gradient-to-r from-gray-50/50 to-gray-100/50 dark:from-gray-800/30 dark:to-gray-700/30 border-gray-200/50 dark:border-gray-700/30';
  };

  const getFilteredLogs = () => {
    let filtered = [...activityLogs];
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(log => 
        log.description?.toLowerCase().includes(term) ||
        log.user?.toLowerCase().includes(term) ||
        log.action?.toLowerCase().includes(term)
      );
    }
    
    if (filterType !== 'all') {
      filtered = filtered.filter(log => log.role === filterType);
    }
    
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      
      filtered = filtered.filter(log => {
        const logDate = new Date(log.timestamp);
        return logDate >= start && logDate <= end;
      });
    } else if (startDate) {
      const start = new Date(startDate);
      filtered = filtered.filter(log => {
        const logDate = new Date(log.timestamp);
        return logDate >= start;
      });
    } else if (endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      filtered = filtered.filter(log => {
        const logDate = new Date(log.timestamp);
        return logDate <= end;
      });
    }
    
    filtered.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    return filtered;
  };

  const filteredLogs = getFilteredLogs();
  const totalFilteredCount = filteredLogs.length;
  const totalPages = Math.ceil(totalFilteredCount / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedLogs = filteredLogs.slice(startIndex, startIndex + itemsPerPage);

  // Statistics
  const totalLogs = activityLogs.length;
  const adminLogs = activityLogs.filter(l => l.role === 'Admin').length;
  const studentLogs = activityLogs.filter(l => l.role === 'Student').length;
  const todayLogs = activityLogs.filter(l => {
    const today = new Date().toDateString();
    return new Date(l.timestamp).toDateString() === today;
  }).length;

  const previewData = filteredLogs.slice(0, 10);
  const previewHeaders = ['User', 'Action', 'Description', 'Date/Time', 'Role'];

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

  const clearDateFilter = () => {
    setStartDate('');
    setEndDate('');
    setDateError('');
    setShowDatePicker(false);
    toast.info('Date filter cleared');
  };

  const applyDateFilter = () => {
    if (validateDateRange()) {
      setShowDatePicker(false);
      setCurrentPage(1);
      toast.success(`Filtering logs from ${startDate || 'any date'} to ${endDate || 'any date'}`);
    }
  };

  const getExportData = () => {
    return filteredLogs.map(log => ({
      'User': log.user || 'Unknown',
      'Role': log.role || 'User',
      'Action': log.action || 'N/A',
      'Description': log.description || 'N/A',
      'Quiz': log.details?.quiz || 'N/A',
      'Score': log.details?.score !== undefined ? `${log.details.score}%` : 'N/A',
      'Date': log.date || new Date(log.timestamp).toLocaleDateString(),
      'Time': log.time || new Date(log.timestamp).toLocaleTimeString(),
      'Timestamp': log.timestamp || new Date().toISOString(),
    }));
  };

  const hasLogs = filteredLogs.length > 0;
  const exportCount = filteredLogs.length;

  const exportJSON = () => {
    if (!hasLogs) {
      toast.error('No activity logs available to export.');
      return;
    }
    
    setExporting(true);
    try {
      const data = JSON.stringify(filteredLogs, null, 2);
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const dateRange = startDate && endDate ? `-${startDate}_to_${endDate}` : '';
      a.download = `activity-log${dateRange}-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success(`Activity log exported as JSON successfully! (${exportCount} records)`);
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Failed to export as JSON');
    } finally {
      setExporting(false);
    }
  };

  const exportPDF = () => {
    if (!hasLogs) {
      toast.error('No activity logs available to export.');
      return;
    }

    setExporting(true);
    try {
      const logsToExport = filteredLogs;
      const doc = new jsPDF('landscape', 'mm', 'a4');
      const pageWidth = doc.internal.pageSize.getWidth();
      
      doc.setFillColor(79, 70, 229);
      doc.rect(0, 0, pageWidth, 45, 'F');
      
      doc.setFontSize(18);
      doc.setTextColor(255, 255, 255);
      doc.text('Activity Log Report', pageWidth / 2, 18, { align: 'center' });
      
      doc.setFontSize(9);
      doc.setTextColor(220, 220, 255);
      doc.text(`Generated: ${new Date().toLocaleString()}`, pageWidth / 2, 28, { align: 'center' });
      const dateRangeText = startDate && endDate ? `Date Range: ${startDate} to ${endDate}` : 'All Dates';
      doc.text(`Total Records: ${logsToExport.length} • ${dateRangeText}`, pageWidth / 2, 34, { align: 'center' });
      
      const headers = ['User', 'Role', 'Action', 'Description', 'Quiz', 'Score', 'Date', 'Time'];
      const body = logsToExport.map(log => [
        log.user || 'Unknown',
        log.role || 'User',
        log.action || 'N/A',
        log.description || 'N/A',
        log.details?.quiz || 'N/A',
        log.details?.score !== undefined ? `${log.details.score}%` : 'N/A',
        log.date || new Date(log.timestamp).toLocaleDateString(),
        log.time || new Date(log.timestamp).toLocaleTimeString(),
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

      const dateRange = startDate && endDate ? `-${startDate}_to_${endDate}` : '';
      doc.save(`activity-log${dateRange}-${new Date().toISOString().split('T')[0]}.pdf`);
      toast.success(`Activity log exported as PDF successfully! (${exportCount} records)`);
    } catch (error) {
      console.error('PDF export error:', error);
      toast.error('Failed to export as PDF');
    } finally {
      setExporting(false);
    }
  };

  const exportDOCX = () => {
    if (!hasLogs) {
      toast.error('No activity logs available to export.');
      return;
    }

    setExporting(true);
    try {
      const logsToExport = filteredLogs;
      const dateRangeText = startDate && endDate ? `Date Range: ${startDate} to ${endDate}` : 'All Dates';
      
      let htmlContent = `
        <html>
          <head>
            <meta charset="UTF-8">
            <title>Activity Log Report</title>
            <style>
              body { font-family: 'Segoe UI', Arial, sans-serif; padding: 40px; background: #f8fafc; }
              .container { max-width: 1200px; margin: 0 auto; background: white; padding: 40px; border-radius: 12px; }
              h1 { color: #4F46E5; border-bottom: 3px solid #4F46E5; padding-bottom: 15px; }
              .meta { color: #64748b; font-size: 14px; margin: 5px 0; }
              .summary { background: #f1f5f9; padding: 15px; border-radius: 8px; margin: 15px 0; }
              table { width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 12px; }
              th { background: #4F46E5; color: white; padding: 10px; text-align: left; }
              td { padding: 8px; border-bottom: 1px solid #e2e8f0; }
              .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #64748b; font-size: 12px; text-align: center; }
              .badge-admin { background: #ede9fe; color: #4F46E5; padding: 2px 10px; border-radius: 12px; display: inline-block; }
              .badge-student { background: #dbeafe; color: #2563eb; padding: 2px 10px; border-radius: 12px; display: inline-block; }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>📋 Activity Log Report</h1>
              <div class="meta">Generated: ${new Date().toLocaleString()}</div>
              <div class="meta">Total Records: ${logsToExport.length}</div>
              <div class="meta">${dateRangeText}</div>
              <div class="summary"><strong>Export Summary:</strong> ${logsToExport.length} activities recorded</div>
              <table>
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Role</th>
                    <th>Action</th>
                    <th>Description</th>
                    <th>Quiz</th>
                    <th>Score</th>
                    <th>Date</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
      `;

      logsToExport.forEach(log => {
        const roleBadge = log.role === 'Admin' ? 'badge-admin' : 'badge-student';
        htmlContent += `
          <tr>
            <td><strong>${log.user || 'Unknown'}</strong></td>
            <td><span class="${roleBadge}">${log.role || 'User'}</span></td>
            <td>${log.action || 'N/A'}</td>
            <td>${log.description || 'N/A'}</td>
            <td>${log.details?.quiz || 'N/A'}</td>
            <td>${log.details?.score !== undefined ? `${log.details.score}%` : 'N/A'}</td>
            <td>${log.date || new Date(log.timestamp).toLocaleDateString()}</td>
            <td>${log.time || new Date(log.timestamp).toLocaleTimeString()}</td>
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
      const dateRange = startDate && endDate ? `-${startDate}_to_${endDate}` : '';
      a.href = url;
      a.download = `activity-log${dateRange}-${new Date().toISOString().split('T')[0]}.doc`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success(`Activity log exported as DOCX successfully! (${exportCount} records)`);
    } catch (error) {
      console.error('DOCX export error:', error);
      toast.error('Failed to export as DOCX');
    } finally {
      setExporting(false);
    }
  };

  const exportHTML = () => {
    if (!hasLogs) {
      toast.error('No activity logs available to export.');
      return;
    }

    setExporting(true);
    try {
      const logsToExport = filteredLogs;
      const dateRangeText = startDate && endDate ? `Date Range: ${startDate} to ${endDate}` : 'All Dates';
      
      let htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Activity Log Report</title>
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
              .badge { display: inline-block; padding: 2px 10px; border-radius: 12px; font-size: 12px; font-weight: 500; }
              .badge-admin { background: #ede9fe; color: #4F46E5; }
              .badge-student { background: #dbeafe; color: #2563eb; }
              .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #64748b; font-size: 12px; text-align: center; }
              .date-range { background: #e0e7ff; padding: 8px 16px; border-radius: 6px; display: inline-block; margin: 10px 0; }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>📋 Activity Log Report</h1>
              <div class="meta">Generated: ${new Date().toLocaleString()}</div>
              <div class="date-range">📅 ${dateRangeText}</div>
              <div class="summary"><strong>Total Records:</strong> ${logsToExport.length}</div>
              <table>
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Role</th>
                    <th>Action</th>
                    <th>Description</th>
                    <th>Quiz</th>
                    <th>Score</th>
                    <th>Date</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
      `;

      logsToExport.forEach(log => {
        const roleBadge = log.role === 'Admin' ? 'badge-admin' : 'badge-student';
        htmlContent += `
          <tr>
            <td><strong>${log.user || 'Unknown'}</strong></td>
            <td><span class="badge ${roleBadge}">${log.role || 'User'}</span></td>
            <td>${log.action || 'N/A'}</td>
            <td>${log.description || 'N/A'}</td>
            <td>${log.details?.quiz || 'N/A'}</td>
            <td>${log.details?.score !== undefined ? `${log.details.score}%` : 'N/A'}</td>
            <td>${log.date || new Date(log.timestamp).toLocaleDateString()}</td>
            <td>${log.time || new Date(log.timestamp).toLocaleTimeString()}</td>
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
      const dateRange = startDate && endDate ? `-${startDate}_to_${endDate}` : '';
      a.href = url;
      a.download = `activity-log${dateRange}-${new Date().toISOString().split('T')[0]}.html`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success(`Activity log exported as HTML successfully! (${exportCount} records)`);
    } catch (error) {
      console.error('HTML export error:', error);
      toast.error('Failed to export as HTML');
    } finally {
      setExporting(false);
    }
  };

  const exportTXT = () => {
    if (!hasLogs) {
      toast.error('No activity logs available to export.');
      return;
    }

    setExporting(true);
    try {
      const logsToExport = filteredLogs;
      const dateRangeText = startDate && endDate ? `Date Range: ${startDate} to ${endDate}` : 'All Dates';
      
      let txtContent = '='.repeat(80) + '\n';
      txtContent += 'ACTIVITY LOG REPORT\n';
      txtContent += '='.repeat(80) + '\n\n';
      txtContent += `Generated: ${new Date().toLocaleString()}\n`;
      txtContent += `Total Records: ${logsToExport.length}\n`;
      txtContent += `${dateRangeText}\n\n`;
      txtContent += '-'.repeat(80) + '\n\n';

      logsToExport.forEach((log, index) => {
        txtContent += `Record #${index + 1}\n`;
        txtContent += `  User: ${log.user || 'Unknown'}\n`;
        txtContent += `  Role: ${log.role || 'User'}\n`;
        txtContent += `  Action: ${log.action || 'N/A'}\n`;
        txtContent += `  Description: ${log.description || 'N/A'}\n`;
        txtContent += `  Quiz: ${log.details?.quiz || 'N/A'}\n`;
        txtContent += `  Score: ${log.details?.score !== undefined ? `${log.details.score}%` : 'N/A'}\n`;
        txtContent += `  Date: ${log.date || new Date(log.timestamp).toLocaleDateString()}\n`;
        txtContent += `  Time: ${log.time || new Date(log.timestamp).toLocaleTimeString()}\n`;
        txtContent += '\n' + '-'.repeat(40) + '\n\n';
      });

      txtContent += '\n' + '='.repeat(80) + '\n';
      txtContent += 'End of Report\n';
      txtContent += '='.repeat(80) + '\n';

      const blob = new Blob([txtContent], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      const dateRange = startDate && endDate ? `-${startDate}_to_${endDate}` : '';
      a.href = url;
      a.download = `activity-log${dateRange}-${new Date().toISOString().split('T')[0]}.txt`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success(`Activity log exported as TXT successfully! (${exportCount} records)`);
    } catch (error) {
      console.error('TXT export error:', error);
      toast.error('Failed to export as TXT');
    } finally {
      setExporting(false);
    }
  };

  const exportImage = () => {
    if (!hasLogs) {
      toast.error('No activity logs available to export.');
      return;
    }

    setExporting(true);
    try {
      const logsToExport = filteredLogs.slice(0, 50);
      const dateRangeText = startDate && endDate ? `Date Range: ${startDate} to ${endDate}` : 'All Dates';
      
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
          📋 Activity Log Report
        </h1>
        <p style="color: #64748b; margin-bottom: 8px; font-size: 14px;">
          Generated: ${new Date().toLocaleString()}
        </p>
        <p style="color: #64748b; margin-bottom: 8px; font-size: 14px;">
          📅 ${dateRangeText}
        </p>
        <p style="color: #64748b; margin-bottom: 20px; font-size: 14px;">
          Total Records: ${logsToExport.length}
        </p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 11px;">
          <thead>
            <tr style="background: #4F46E5; color: white;">
              <th style="padding: 8px; text-align: left;">User</th>
              <th style="padding: 8px; text-align: left;">Role</th>
              <th style="padding: 8px; text-align: left;">Action</th>
              <th style="padding: 8px; text-align: left;">Description</th>
              <th style="padding: 8px; text-align: left;">Date</th>
            </tr>
          </thead>
          <tbody>
      `;

      logsToExport.forEach(log => {
        htmlContent += `
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 6px;"><strong>${log.user || 'Unknown'}</strong></td>
            <td style="padding: 6px;">${log.role || 'User'}</td>
            <td style="padding: 6px;">${log.action || 'N/A'}</td>
            <td style="padding: 6px;">${log.description || 'N/A'}</td>
            <td style="padding: 6px;">${log.date || new Date(log.timestamp).toLocaleDateString()}</td>
          </tr>
        `;
      });

      if (filteredLogs.length > 50) {
        htmlContent += `
          <tr>
            <td colspan="5" style="padding: 10px; text-align: center; font-style: italic; color: #64748b;">
              ... and ${filteredLogs.length - 50} more records
            </td>
          </tr>
        `;
      }

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
        const dateRange = startDate && endDate ? `-${startDate}_to_${endDate}` : '';
        link.download = `activity-log${dateRange}-${new Date().toISOString().split('T')[0]}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        document.body.removeChild(container);
        toast.success(`Activity log exported as Image successfully! (${exportCount} records)`);
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
          <p className="mt-4 text-gray-600 dark:text-gray-300 font-medium">Loading activity logs...</p>
          <p className="text-sm text-gray-400 dark:text-gray-500">Preparing your activity data</p>
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
              <FaHistory className="text-white text-2xl" />
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500 bg-clip-text text-transparent">
              Activity Log
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              Track all user activities and events
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
              {filteredLogs.length} Activities
            </span>
          </div>
          {startDate && endDate && (
            <div className="flex items-center gap-2 px-4 py-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-purple-200/50 dark:border-purple-700/50 shadow-sm">
              <FaCalendarAlt className="text-purple-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {startDate} → {endDate}
              </span>
            </div>
          )}
        </motion.div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Activities', value: totalLogs, icon: FaHistory, color: 'purple', gradient: 'from-purple-500 to-indigo-500' },
          { label: 'Today', value: todayLogs, icon: FaFire, color: 'orange', gradient: 'from-orange-500 to-amber-500' },
          { label: 'Admin Actions', value: adminLogs, icon: FaUserShield, color: 'blue', gradient: 'from-blue-500 to-cyan-500' },
          { label: 'Student Actions', value: studentLogs, icon: FaUsers, color: 'emerald', gradient: 'from-emerald-500 to-teal-500' },
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
        className="flex flex-wrap items-center justify-between gap-4 mb-6 p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg"
      >
        <div className="flex flex-wrap items-center gap-3 flex-1">
          <div className="relative flex-1 min-w-[200px]">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search activities by user, action, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-100/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              >
                <FaTimes />
              </button>
            )}
          </div>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2.5 bg-gray-100/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300"
          >
            <option value="all">👥 All Users</option>
            <option value="Admin">🛡️ Admin</option>
            <option value="Student">🎓 Students</option>
          </select>

          {/* Date Range Filter Button */}
          <button
            onClick={() => setShowDatePicker(!showDatePicker)}
            className={`px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 transition-all duration-300 ${
              startDate || endDate 
                ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50' 
                : 'bg-gray-100/50 dark:bg-gray-700/50 border border-gray-200/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 hover:border-purple-400'
            }`}
          >
            <FaCalendarAlt />
            {startDate || endDate ? '📅 Filtered by Date' : 'Select Date Range'}
            {(startDate || endDate) && (
              <FaTimes 
                className="ml-1 cursor-pointer hover:text-red-500 transition-colors" 
                onClick={(e) => {
                  e.stopPropagation();
                  clearDateFilter();
                }}
              />
            )}
          </button>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {filteredLogs.length} activities found
          </span>
        </div>
      </motion.div>

      {/* Date Range Picker */}
      <AnimatePresence>
        {showDatePicker && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mb-6"
          >
            <div className="p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-purple-200/50 dark:border-purple-800/50 shadow-lg">
              <div className="flex flex-wrap items-end gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="px-4 py-2 bg-gray-100/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm border border-gray-200/50 dark:border-gray-700/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="px-4 py-2 bg-gray-100/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm border border-gray-200/50 dark:border-gray-700/50"
                  />
                </div>
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={applyDateFilter}
                    className="px-6 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl font-medium shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300"
                  >
                    Apply Filter
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={clearDateFilter}
                    className="px-4 py-2 bg-gray-200/50 dark:bg-gray-700/50 hover:bg-gray-300/50 dark:hover:bg-gray-600/50 text-gray-700 dark:text-gray-300 rounded-xl font-medium transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50"
                  >
                    Clear
                  </motion.button>
                </div>
              </div>
              {dateError && (
                <p className="mt-2 text-sm text-red-500">{dateError}</p>
              )}
              <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <FaLightbulb className="text-amber-500" />
                Select a date range to filter activities. Click "Apply Filter" to update the list.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
            Export Activity Logs
          </h3>
          <FaInfoCircle className="text-gray-400 text-xs ml-2" />
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Click any format below to export Activity Logs.
          </span>
          {startDate && endDate && (
            <span className="text-xs bg-purple-100/50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-2 py-1 rounded-full border border-purple-200/50 dark:border-purple-700/30">
              📅 {startDate} → {endDate}
            </span>
          )}
          {hasLogs && (
            <span className="text-xs bg-emerald-100/50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-2 py-1 rounded-full border border-emerald-200/50 dark:border-emerald-700/30">
              {exportCount} records
            </span>
          )}
        </div>
        
        {!hasLogs ? (
          <div className="text-center py-8 bg-gray-50/50 dark:bg-gray-800/30 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700">
            <FaFileAlt className="text-4xl text-gray-300 dark:text-gray-600 mx-auto mb-2" />
            <p className="text-gray-500 dark:text-gray-400">No activity logs available to export in the selected date range.</p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-3">
            {[
              { icon: FaFileCode, label: 'JSON', color: 'blue', onClick: exportJSON },
              { icon: FaFilePdf, label: 'PDF', color: 'red', onClick: exportPDF },
              { icon: FaFileWord, label: 'DOCX', color: 'blue', onClick: exportDOCX },
              { icon: FaFileCode, label: 'HTML', color: 'purple', onClick: exportHTML },
              { icon: FaFile, label: 'TXT', color: 'gray', onClick: exportTXT },
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

      {/* Activity Log Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="relative overflow-hidden rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300"
      >
        {/* Decorative Gradient Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500" />

        <div className="overflow-x-auto">
          <div className="max-h-[500px] overflow-y-auto overflow-x-auto">
            <table className="w-full text-sm min-w-[900px]">
              <thead className="bg-gradient-to-r from-purple-50/50 to-indigo-50/50 dark:from-purple-900/10 dark:to-indigo-900/10 sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    Action
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    Role
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200/50 dark:divide-gray-700/50">
                {paginatedLogs.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <FaHistory className="text-5xl text-gray-300 dark:text-gray-600" />
                        <p className="text-gray-500 dark:text-gray-400 font-medium">No activities found</p>
                        <p className="text-sm text-gray-400 dark:text-gray-500">Try adjusting your search or filters</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  paginatedLogs.map((log, index) => (
                    <motion.tr
                      key={log.id || index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.03 }}
                      whileHover={{ scale: 1.005 }}
                      onMouseEnter={() => setHoveredRow(index)}
                      onMouseLeave={() => setHoveredRow(null)}
                      className={`hover:bg-purple-50/30 dark:hover:bg-purple-900/10 transition-all duration-300 ${getActivityColor(log.action)}`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="text-xl">
                            {getActivityIcon(log.action)}
                          </div>
                          <div>
                            <div className="font-medium text-gray-800 dark:text-gray-200">
                              {log.user || 'Unknown'}
                            </div>
                            {log.details?.quiz && (
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                Quiz: {log.details.quiz}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-semibold text-gray-700 dark:text-gray-300">
                          {log.action || 'N/A'}
                        </span>
                        {log.details?.score !== undefined && (
                          <div className={`text-xs font-semibold ${
                            log.details.score >= 90 ? 'text-emerald-500' : 'text-red-500'
                          }`}>
                            Score: {log.details.score}%
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-gray-600 dark:text-gray-400 max-w-xs">
                          {log.description || 'N/A'}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                            <FaCalendarAlt className="text-gray-400 text-xs" />
                            <span>{log.date || new Date(log.timestamp).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500 mt-1">
                            <FaClock className="text-gray-400 text-xs" />
                            <span>{log.time || new Date(log.timestamp).toLocaleTimeString()}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                          log.role === 'Admin' 
                            ? 'bg-purple-100/50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border border-purple-200/50 dark:border-purple-700/30'
                            : 'bg-blue-100/50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200/50 dark:border-blue-700/30'
                        }`}>
                          {log.role === 'Admin' ? '🛡️' : '🎓'}
                          {log.role || 'User'}
                        </span>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-t border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-purple-50/30 to-indigo-50/30 dark:from-purple-900/5 dark:to-indigo-900/5">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
              <span className="font-medium">{Math.min(startIndex + itemsPerPage, totalFilteredCount)}</span> of{' '}
              <span className="font-medium">{totalFilteredCount}</span> activities
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-xl bg-white/50 dark:bg-gray-800/50 hover:bg-purple-100/50 dark:hover:bg-purple-900/20 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 flex items-center gap-2"
              >
                <FaArrowLeft className="text-xs" />
                Previous
              </button>
              <span className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold shadow-lg shadow-purple-500/30">
                {currentPage} / {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-xl bg-white/50 dark:bg-gray-800/50 hover:bg-purple-100/50 dark:hover:bg-purple-900/20 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 flex items-center gap-2"
              >
                Next
                <FaArrowRight className="text-xs" />
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default AdminActivity;