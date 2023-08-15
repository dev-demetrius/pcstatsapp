import React, { useState, useEffect } from "react";
import StatItem from "./StatItem";

import "./PcStats.css";

function PcStats() {
    const [orderedStats, setOrderedStats] = useState([]);
    const [stats, setStats] = useState(initialValue);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://192.168.50.244:3001/stats")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                setStats(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(
                    "There was a problem with the fetch operation:",
                    error
                );
                setLoading(false);
            });
    }, []);

    if (loading) {
        return "Loading stats...";
    }

    const moveItem = (fromIndex, toIndex) => {
        const updatedOrder = [...orderedStats];
        const [movedItem] = updatedOrder.splice(fromIndex, 1);
        updatedOrder.splice(toIndex, 0, movedItem);
        setOrderedStats(updatedOrder);
    };

    return (
        <div className='canvas'>
            {loading
                ? "Loading stats..."
                : stats && (
                      <div className='container'>
                          <StatItem label='Platform' value={stats.platform} />
                          <StatItem
                              label='Total Memory (in bytes)'
                              value={stats.totalMemory}
                          />
                          <StatItem
                              label='Free Memory (in bytes)'
                              value={stats.freeMemory}
                          />
                          <StatItem
                              label='CPU Usage (1, 5, 15 min averages)'
                              value={stats.cpuUsage.join(", ")}
                          />
                          <StatItem
                              label='Uptime'
                              value={`${stats.uptime} seconds`}
                          />
                          {/* More stats... */}
                      </div>
                  )}
        </div>
    );
}

export default PcStats;
