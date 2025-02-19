import Head from "next/head";
import Image from "next/image";
import React from 'react';

export async function getStaticPaths() {
    const industries = require('../../files/industries.json');
    const paths = industries.map(industry => ({
        params: { id: industry.link }, // Use industry.link here
    }));
    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    const industries = require('../../files/industries.json');
    const industry = industries.find(industry => industry.link === params.id); //Match on link

    if (!industry) {
        return { notFound: true }
    }
    return { props: { industry } };
}


export default function IndustryDetail({ industry }) {

    const renderContent = (content) => {
        if (Array.isArray(content)) {
          return content.map((item, index) => {
          if (item.tag === 'ul') {
                  let list = item.content.map((listItem, index) => <li key={index} dangerouslySetInnerHTML={{ __html: listItem.content }}></li>)
                  return <ul key={index}>{list}</ul>;
          } else if(item.tag === 'img') {
               return <Image key={index} src={item.src} alt={item.alt} width={item.width || 500} height={item.height || 350} />
          } else if (item.content) {
                  return React.createElement(item.tag, { key: index, dangerouslySetInnerHTML: { __html: item.content } });
              }
                return null;
            });
        } else {
            return <div dangerouslySetInnerHTML={{ __html: content }}></div>;
        }
    };

    return (
        <>
            <Head>
                <title>{industry.title}</title>
                <meta name="description" content={industry.description} />
            </Head>

            {industry.fullImage && ( // Conditionally render the banner if fullImage exists
                <div className="industrie_detail_banner">
                    <div className="detail_img_block">
                      <Image src={industry.fullImage} alt={industry.title} quality={100} width={500} height={350} />                        
                    </div>
                </div>
            )}

            <div className="industries_detail_section">
                <div className="container">
                    <div className="industrie_wrap_sec">
                        {renderContent(industry.content)}
                    </div>
                </div>
            </div>
        </>
    );
}