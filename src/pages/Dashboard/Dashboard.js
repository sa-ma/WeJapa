import React from 'react';
import Loader from 'react-loader-spinner';
import Sidebar from '../../components/Sidebar';
import { useAuth } from '../../context/auth';
import Card from '../../components/Card';
import useJobs from '../../hooks/useJobs';
import './Dashboard.scss';

const Dashboard = () => {
  const { authUser } = useAuth();
  const { isLoading, data, error } = useJobs(authUser.token);

  let jobsContainer;
  if (data.jobs) {
    jobsContainer = data.jobs.map((job) => (
      <Card
        key={job._id}
        jobId={job._id}
        title={job.title}
        salary={job.salary}
        status={job.status}
        type={job.type}
        location={job.location}
      />
    ));
  }

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard__content">
        <h1 className="dashboard__content__title">
          Hello {authUser && authUser.info.name},
        </h1>

        <div className="dashboard__content__jobs">
          <h2 className="dashboard__content__jobs__title"> Latest Roles</h2>
          {isLoading && (
            <div className="loading">
              <Loader type="Oval" color="#041705" height={32} width={32} />
            </div>
          )}
          {error && (
            <div className="error">Error fetching Data. Try again.</div>
          )}
          <div className="grid">{jobsContainer}</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
