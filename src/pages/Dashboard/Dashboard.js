import React, { useState } from 'react';
import Loader from 'react-loader-spinner';
import Sidebar from '../../components/Sidebar';
import { useAuth } from '../../context/auth';
import Card from '../../components/Card';
import useJobs from '../../hooks/useJobs';
import './Dashboard.scss';

const Dashboard = () => {
  const { authUser } = useAuth();
  const { isLoading, data, error } = useJobs(authUser.token);
  const [searchValue, setSearchValue] = useState('');

  let jobsContainer;

  if (data.jobs) {
    jobsContainer = data.jobs
      .filter((job) => {
        return (
          searchValue === '' ||
          job.location.toLowerCase().includes(searchValue.toLowerCase()) ||
          job.title.toLowerCase().includes(searchValue.toLowerCase()) ||
          job.status.toLowerCase().includes(searchValue.toLowerCase())
        );
      })
      .map((job) => (
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

  const handleChange = (event) => setSearchValue(event.target.value);

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard__content">
        <div className="dashboard__content__search">
          <input
            type="text"
            name="search"
            aria-label="Filter Jobs"
            value={searchValue}
            onChange={handleChange}
            placeholder="Filter by location, role, and status"
          />
        </div>
        <h1 className="dashboard__content__title">
          Hello {authUser && authUser.info.name},
        </h1>

        <div className="dashboard__content__jobs">
          <h2 className="dashboard__content__jobs__title"> All Jobs</h2>
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
