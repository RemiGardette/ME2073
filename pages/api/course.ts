import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import xml2js from 'xml2js';

async function getCourseInfo(courseCode: string, language: string = 'en'): Promise<any> {
    try {
        const response = await axios.get(`https://api.kth.se/api/kopps/v1/course/${courseCode}/${language}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching course information:', error);
        throw error; // Re-throw the error to be handled by the caller
    }
}

function parseCourseInfo(courseInfoXml: string): any {
    return new Promise((resolve, reject) => {
        xml2js.parseString(courseInfoXml, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const { code } = req.query;
        if (!code || typeof code !== 'string') {
            res.status(400).json({ error: 'Invalid course code' });
            return;
        }
        try {
            const courseInfoXml = await getCourseInfo(code);
            const courseInfo = await parseCourseInfo(courseInfoXml);
            res.status(200).json(courseInfo);
        } catch (error) {
            console.error('Error fetching course information:', error);
            res.status(500).json({ error: 'Error fetching course information' });
        }
    } else {
        res.status(405).end(); // Method Not Allowed
    }
}