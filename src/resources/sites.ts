import type { Website } from '@/types/types';

const sites: Website[] = [
    {
        name: 'Fareen Khan',
        year: '2020',
        link: new URL('https://fareenkhan.vercel.app/'),
        skills: ['java', 'swift'],
    },
    {
        name: 'Zakir Dawood',
        year: '2025',
        link: new URL('https://zakirdawood.herokuapp.com/'),
        skills: ['python', 'power bi'],
    },
    {
        name: 'Muyeed Hossain',
        year: '2025',
        link: new URL('https://muyeed10.github.io/Portfolio/'),
        skills: ['javascript', 'python'],
    },
];
export default sites;
