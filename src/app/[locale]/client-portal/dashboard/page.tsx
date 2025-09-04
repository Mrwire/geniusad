import React from 'react';
import { Typography } from '@/components/atoms/Typography';
import { getTranslations } from 'next-intl/server';
import { client } from '@/lib/sanity';
import { protectPage } from '@/lib/auth-helpers';
import Image from 'next/image';
import Link from 'next/link';

interface PageProps {
  params: {
    locale: string;
  };
}

// Function to fetch data for the dashboard
async function getDashboardData(userId: string) {
  // Fetch projects associated with the user
  const projects = await client.fetch(
    `*[_type == "project" && references($userId)] {
      _id,
      title,
      status,
      "clientName": client->name,
      "subsidiaryName": subsidiary->name,
      startDate,
      endDate
    } | order(startDate desc)`,
    { userId }
  );

  // Fetch pending approvals
  const approvals = await client.fetch(
    `*[_type == "project" && references($userId)] {
      _id,
      title,
      "approvals": approvals[status == "pending"] {
        title,
        description,
        createdAt
      }
    }`,
    { userId }
  );

  // Fetch recent messages
  const messages = await client.fetch(
    `*[_type == "project" && references($userId)] {
      _id,
      title,
      "messages": messages[isInternal != true] {
        _key,
        content,
        sentAt,
        "sender": sender->name
      }
    }`,
    { userId }
  );

  // Fetch upcoming meetings
  const meetings = await client.fetch(
    `*[_type == "project" && references($userId)] {
      _id,
      title,
      "meetings": meetings[date >= $today && status != "cancelled"] {
        title,
        date,
        startTime,
        endTime,
        location,
        meetingType
      }
    }`,
    { userId, today: new Date().toISOString().split('T')[0] }
  );

  // Extract all approvals across projects
  const allApprovals = approvals
    .flatMap((project: any) => 
      project.approvals.map((approval: any) => ({
        ...approval,
        projectId: project._id,
        projectTitle: project.title,
      }))
    )
    .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  // Extract all messages across projects
  const allMessages = messages
    .flatMap((project: any) => 
      project.messages.map((message: any) => ({
        ...message,
        projectId: project._id,
        projectTitle: project.title,
      }))
    )
    .sort((a: any, b: any) => new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime())
    .slice(0, 5);

  // Extract all meetings across projects
  const allMeetings = meetings
    .flatMap((project: any) => 
      project.meetings.map((meeting: any) => ({
        ...meeting,
        projectId: project._id,
        projectTitle: project.title,
      }))
    )
    .sort((a: any, b: any) => {
      const dateComparison = new Date(a.date).getTime() - new Date(b.date).getTime();
      if (dateComparison === 0) {
        return a.startTime.localeCompare(b.startTime);
      }
      return dateComparison;
    })
    .slice(0, 3);

  return {
    projects: projects.slice(0, 4),
    approvals: allApprovals,
    messages: allMessages,
    meetings: allMeetings,
    stats: {
      totalProjects: projects.length,
      activeProjects: projects.filter((p: any) => p.status !== 'completed').length,
      pendingApprovals: allApprovals.length,
      upcomingMeetings: allMeetings.length,
    }
  };
}

export default async function DashboardPage({ params: { locale } }: PageProps) {
  const user = await protectPage();
  const t = await getTranslations('clientPortal.dashboard');
  
  const dashboardData = await getDashboardData(user.id);

  // Format date helper function
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString(locale, { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  // Status colors
  const statusColors: Record<string, string> = {
    'planning': 'bg-blue-100 text-blue-800',
    'in-progress': 'bg-yellow-100 text-yellow-800',
    'review': 'bg-purple-100 text-purple-800',
    'revisions': 'bg-orange-100 text-orange-800',
    'approved': 'bg-green-100 text-green-800',
    'completed': 'bg-gray-100 text-gray-800',
  };

  return (
    <div className="space-y-6">
      {/* Dashboard header */}
      <div className="sm:flex sm:items-center sm:justify-between">
        <Typography variant="h1" className="text-2xl font-semibold text-gray-900">
          {t('dashboard')}
        </Typography>
        <div className="mt-3 sm:mt-0">
          <Link
            href={`/${locale}/client-portal/projects`}
            className="inline-flex items-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
          >
            {t('viewAllProjects')}
          </Link>
        </div>
      </div>

      {/* Statistics summary */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">{t('totalProjects')}</dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
            {dashboardData.stats.totalProjects}
          </dd>
        </div>
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">{t('activeProjects')}</dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
            {dashboardData.stats.activeProjects}
          </dd>
        </div>
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">{t('pendingApprovals')}</dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
            {dashboardData.stats.pendingApprovals}
          </dd>
        </div>
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">{t('upcomingMeetings')}</dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
            {dashboardData.stats.upcomingMeetings}
          </dd>
        </div>
      </div>

      {/* Projects */}
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="p-6">
          <div className="sm:flex sm:items-center sm:justify-between">
            <Typography variant="h2" className="text-xl font-semibold text-gray-900">
              {t('recentProjects')}
            </Typography>
            <div className="mt-3 sm:mt-0">
              <Link
                href={`/${locale}/client-portal/projects`}
                className="text-sm font-medium text-primary-600 hover:text-primary-500"
              >
                {t('viewAll')}
              </Link>
            </div>
          </div>
          <div className="mt-6 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                        {t('projectName')}
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        {t('status')}
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        {t('startDate')}
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        {t('viewDetails')}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {dashboardData.projects.length > 0 ? (
                      dashboardData.projects.map((project: any) => (
                        <tr key={project._id}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                            {project.title}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${statusColors[project.status] || 'bg-gray-100 text-gray-800'}`}>
                              {t(`projectStatus.${project.status}`)}
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {formatDate(project.startDate)}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <Link 
                              href={`/${locale}/client-portal/projects/${project._id}`}
                              className="text-primary-600 hover:text-primary-900"
                            >
                              {t('viewDetails')}
                            </Link>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="px-3 py-4 text-sm text-gray-500 text-center">
                          {t('noProjects')}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Approvals */}
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-6">
            <div className="sm:flex sm:items-center sm:justify-between">
              <Typography variant="h2" className="text-xl font-semibold text-gray-900">
                {t('pendingApprovals')}
              </Typography>
              <div className="mt-3 sm:mt-0">
                <Link
                  href={`/${locale}/client-portal/approvals`}
                  className="text-sm font-medium text-primary-600 hover:text-primary-500"
                >
                  {t('viewAll')}
                </Link>
              </div>
            </div>
            <div className="mt-6 flow-root">
              <ul className="divide-y divide-gray-200">
                {dashboardData.approvals.length > 0 ? (
                  dashboardData.approvals.map((approval: any) => (
                    <li key={approval._key || approval.title} className="py-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-gray-900">{approval.title}</p>
                          <p className="truncate text-sm text-gray-500">{approval.projectTitle}</p>
                        </div>
                        <div>
                          <Link
                            href={`/${locale}/client-portal/approvals/${approval.projectId}`}
                            className="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-primary-600 shadow-sm ring-1 ring-inset ring-primary-300 hover:bg-primary-50"
                          >
                            {t('review')}
                          </Link>
                        </div>
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="py-4 text-sm text-gray-500 text-center">
                    {t('noApprovals')}
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Upcoming meetings */}
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-6">
            <div className="sm:flex sm:items-center sm:justify-between">
              <Typography variant="h2" className="text-xl font-semibold text-gray-900">
                {t('upcomingMeetings')}
              </Typography>
              <div className="mt-3 sm:mt-0">
                <Link
                  href={`/${locale}/client-portal/meetings`}
                  className="text-sm font-medium text-primary-600 hover:text-primary-500"
                >
                  {t('viewAll')}
                </Link>
              </div>
            </div>
            <div className="mt-6 flow-root">
              <ul className="divide-y divide-gray-200">
                {dashboardData.meetings.length > 0 ? (
                  dashboardData.meetings.map((meeting: any) => (
                    <li key={meeting._key || meeting.title + meeting.date} className="py-4">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-2xl font-bold text-primary-700">
                            {new Date(meeting.date).getDate()}
                          </div>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-900">{meeting.title}</p>
                          <p className="mt-1 text-sm text-gray-500">
                            {formatDate(meeting.date)} • {meeting.startTime} - {meeting.endTime}
                          </p>
                          <p className="mt-1 text-sm text-gray-500">{meeting.projectTitle}</p>
                        </div>
                        <div className="flex-shrink-0 self-center">
                          <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${meeting.meetingType === 'video' ? 'bg-blue-100 text-blue-800' : meeting.meetingType === 'in-person' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                            {meeting.meetingType === 'video' ? t('videoCall') : meeting.meetingType === 'in-person' ? t('inPerson') : t('phoneCall')}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="py-4 text-sm text-gray-500 text-center">
                    {t('noMeetings')}
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Recent messages */}
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="p-6">
          <div className="sm:flex sm:items-center sm:justify-between">
            <Typography variant="h2" className="text-xl font-semibold text-gray-900">
              {t('recentMessages')}
            </Typography>
            <div className="mt-3 sm:mt-0">
              <Link
                href={`/${locale}/client-portal/messages`}
                className="text-sm font-medium text-primary-600 hover:text-primary-500"
              >
                {t('viewAll')}
              </Link>
            </div>
          </div>
          <div className="mt-6 flow-root">
            <ul className="divide-y divide-gray-200">
              {dashboardData.messages.length > 0 ? (
                dashboardData.messages.map((message: any) => (
                  <li key={message._key} className="py-4">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-700">
                            {message.sender ? message.sender.charAt(0) : 'U'}
                          </span>
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900">{message.sender || t('unknown')}</p>
                        <p className="mt-1 text-sm text-gray-500">
                          {message.content.length > 100 
                            ? `${message.content.substring(0, 100)}...` 
                            : message.content}
                        </p>
                        <div className="mt-2 flex items-center text-xs text-gray-500">
                          <span>{formatDate(message.sentAt)}</span>
                          <span className="mx-1">•</span>
                          <span>{message.projectTitle}</span>
                        </div>
                      </div>
                      <div className="flex-shrink-0 self-center">
                        <Link
                          href={`/${locale}/client-portal/messages/${message.projectId}`}
                          className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-primary-600 shadow-sm ring-1 ring-inset ring-primary-300 hover:bg-primary-50"
                        >
                          {t('reply')}
                        </Link>
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <li className="py-4 text-sm text-gray-500 text-center">
                  {t('noMessages')}
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 