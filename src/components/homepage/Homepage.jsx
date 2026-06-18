import React from 'react';
import Banner from './Banner';
import LatestFeaturedTasks from './LatestFeatureTask';
import TopFreelancers from './TopFreelancers';
import HowItWorks from './HowItWorks';
import Testimonials from './Testimonials';

const Homepage = () => {
    return (
        <div>
            <Banner></Banner>
            <LatestFeaturedTasks></LatestFeaturedTasks>
            <TopFreelancers></TopFreelancers>
            <HowItWorks></HowItWorks>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Homepage;