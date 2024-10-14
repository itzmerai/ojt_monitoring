import React, { useEffect, useState } from "react";
import axios from "axios";
import "./admin-overview.scss";
import {
  FaUsers,
  FaGraduationCap,
  FaBriefcase,
  FaBuilding,
} from "react-icons/fa";
import { ResponsiveContainer } from "recharts";
import Card from "../../../../shared/components/cards/card";
import DonutChartCard from "../../../../shared/components/charts/donut-chart";
import ProgressRingCard from "../../../../shared/components/charts/ring-chart";
import LineChartCard from "../../../../shared/components/charts/line-chart";
import RecentCoordinators from "../../../../shared/components/cards/overview-coordinator/recentcoordinator";
import NewCoordinatorCard from "../../../../shared/components/new-coordinator/new-coordinator";

const Overview: React.FC = () => {
  const [totalCoordinators, setTotalCoordinators] = useState<number | null>(
    null
  );
  const [totalStudents, setTotalStudents] = useState<number | null>(null);
  const [totalPrograms, setTotalPrograms] = useState<number | null>(null);
  const [totalCompanies, setTotalCompanies] = useState<number | null>(null);
  const [recentlyAddedCoordinators, setRecentlyAddedCoordinators] = useState<
    {
      id: number;
      profilePicture: string;
      name: string;
      registrationDate: string;
    }[]
  >([]);
  const [attendancePercentage, setAttendancePercentage] = useState<number>(0);

  useEffect(() => {
    const fetchTotalCoordinators = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/count-coordinators"
        );
        setTotalCoordinators(response.data.count);
      } catch (error) {
        console.error("Error fetching total coordinators:", error);
      }
    };

    const fetchTotalStudents = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/count-students"
        );
        setTotalStudents(response.data.count);
      } catch (error) {
        console.error("Error fetching total students:", error);
      }
    };

    const fetchTotalPrograms = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/count-programs"
        );
        setTotalPrograms(response.data.count);
      } catch (error) {
        console.error("Error fetching total programs:", error);
      }
    };

    const fetchTotalCompanies = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/count-companies"
        );
        setTotalCompanies(response.data.count);
      } catch (error) {
        console.error("Error fetching total companies:", error);
      }
    };

    const fetchRecentlyAddedCoordinators = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/recent-coordinators"
        );
        setRecentlyAddedCoordinators(response.data.recentCoordinators);
      } catch (error) {
        console.error("Error fetching recently added coordinators:", error);
      }
    };

    const fetchAttendancePercentage = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/attendance-percentage"
        );
        setAttendancePercentage(response.data.percentage);
      } catch (error) {
        console.error("Error fetching attendance percentage:", error);
      }
    };

    fetchTotalCoordinators();
    fetchTotalStudents();
    fetchTotalPrograms();
    fetchTotalCompanies();
    fetchRecentlyAddedCoordinators();
    fetchAttendancePercentage();
  }, []);

  return (
    <div className="overview">
      <div className="cards-grid">
        <div className="card-column">
          <Card
            label="Total Coordinators"
            value={
              totalCoordinators !== null ? totalCoordinators.toString() : "0"
            }
            icon={<FaUsers />}
            className="total-coordinator"
          />
          <Card
            label="Total Programs"
            value={totalPrograms !== null ? totalPrograms.toString() : "0"}
            icon={<FaBriefcase />}
            className="total-program"
          />
        </div>

        <div className="card-column">
          <Card
            label="Total Companies"
            value={totalCompanies !== null ? totalCompanies.toString() : "0"}
            icon={<FaBuilding />}
            className="total-company"
          />
          <Card
            label="Total Students"
            value={totalStudents !== null ? totalStudents.toString() : "0"}
            icon={<FaGraduationCap />}
            className="total-student"
          />
        </div>
        <ProgressRingCard percentage={attendancePercentage} />
        {/* <div className="recent-coordinators">
          <h2>Recently Added Coordinators</h2>
          <div className="new-members-list">
            {recentlyAddedCoordinators.slice(0, 5).map((coordinator) => (
              <NewCoordinatorCard
                key={coordinator.id}
                profilePicture={coordinator.profilePicture}
                name={coordinator.name}
                registrationDate={coordinator.registrationDate}
              />
            ))}
          </div>
        </div>*/}
      </div>

      <div className="chart-two">
        <div className="chart-container">
          <h2>Program-wise Student Distribution</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChartCard />
          </ResponsiveContainer>
        </div>
        <div className="recent-coordinators">
          <h2>Recently Added Coordinators</h2>
          <div className="new-members-list">
            {recentlyAddedCoordinators.slice(0, 5).map((coordinator) => (
              <NewCoordinatorCard
                key={coordinator.id}
                profilePicture={coordinator.profilePicture}
                name={coordinator.name}
                registrationDate={coordinator.registrationDate}
              />
            ))}
          </div>
        </div>
        {/*<ProgressRingCard percentage={attendancePercentage} />*/}
      </div>
    </div>
  );
};

export default Overview;
