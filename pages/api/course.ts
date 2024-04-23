import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import xml2js from 'xml2js';

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function getCourseInfo(courseCode: string, language: string = 'en'): Promise<any> {
    try {
        const response = await axios.get(`https://api.kth.se/api/kopps/v1/course/${courseCode}/${language}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching course information:', error);
        throw error; // Re-throw the error to be handled by the caller
    }
}

const parseXml = (xmlString: string): any => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
    const courseNode = xmlDoc.getElementsByTagName('course')[0];
  
    const courseCode = courseNode.getAttribute('code');
    const title = courseNode.getElementsByTagName('title')[0].textContent;
    const examiner = courseNode.getElementsByTagName('examiner')[0].textContent;

    const creditCheck = courseNode.getElementsByTagName('credits')[0].textContent || "N/A";
    var creditString: string;
    if(creditCheck !== null){
        creditString = creditCheck;
    }
    else{
        creditString = "N/A";
    }
    const credits = parseFloat(creditString);
  
    return {
      courseCode,
      title,
      examiner,
      credits
    };
  };

  export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const { code } = req.query;
        if (!code || typeof code !== 'string') {
            res.status(400).json({ error: 'Invalid course code' });
            return;
        }
        try {
            // Assume getCourseInfo function retrieves XML content for a given course code
            const courseInfoXml = await getCourseInfo(code);
            const courseInfo = await parseXml(courseInfoXml); // Use the parseXml function from the previous example
            res.status(200).json({ courseInfo });
        } catch (error) {
            console.error('Error fetching course information:', error);
            res.status(500).json({ error: 'Error fetching course information' });
        }
    } else {
        res.status(405).end(); // Method Not Allowed
    }
}
