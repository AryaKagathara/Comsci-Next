import React from 'react';

const ServiceProcess = ({ strategyTitle, strategyDescription, steps }) => {
    return (
        <div className="strategy">
            <div className="container">
                <div className="strategy_section">
                    <div className="row">
                        <div className="col-lg-5">
                            <div className="text_section fadeInUp">
                                <h3>{strategyTitle}</h3> {/* Dynamic title */}
                                <p class="my-3 text-white">{strategyDescription}</p> {/* Dynamic description */}
                            </div>
                        </div>
                        <div className="col-lg-6 offset-lg-1">
                            <div className="strategy_step">
                                <div className="step_box">
                                    {steps.map((step) => (
                                        <div className="image_content">
                                            <div className="content_box_2">
                                                <span>{step.title}</span>
                                                <p>{step.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ServiceProcess;