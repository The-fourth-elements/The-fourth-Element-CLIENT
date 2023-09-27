'use client';

import './styles.scss';
import { useEffect, useState } from 'react';
import { useUserDetail } from '@/zustand/store/userDetail';
import {
    Button,
	Card,
	CardHeader,
	CardBody,
	Image,
	CircularProgress,
    Progress,
    Link,
} from '@nextui-org/react';

import {modules} from '../../utils/navigation'

const ProfileUser = ({ params }) => {

    const { detail, getDetail } = useUserDetail();

	useEffect(() => {
		if (params.id) {
			getDetail(params.id);
		}
	}, [params.id, detail.role]);

    console.log(detail);

    let imageSRC = "https://cdn.pnghd.pics/data/862/user-profile-png-15.png"

    // detail.profile_img ? imageSRC = detail : imageSRC = 'https://cdn.pnghd.pics/data/862/user-profile-png-15.png'

    return(
        <main>
            <Card className='cardDisplay'>
                <h1 className='h1Name text-xl'>{detail.username} Profile</h1>
                <Card className='cardProfile m-2 p-2'>
                    <div className='w-1/3'>
                        <Image src={imageSRC} alt={detail.username}/>
                    </div>
                    <h3 className='text-xl m-3'>Name: {detail.name} {detail.lastname}</h3>
                    <h3 className='text-xl m-3'>Adress: {detail.adress}</h3>
                    <h3 className='text-xl m-3'>City: {detail.city}</h3>
                    <h3 className='text-xl m-3'>Country {detail.nation}</h3>
                    <Button className='self-end'>
                        <Link href={`/profile/${detail._id}/edit`}>Edit</Link>
                    </Button>
                </Card>
                <CardBody className='cardBody p-0 m-2 w-auto'>
                    <Card className='titles'>
                        <h4 className='flex justify-center text-xl m-2'>Titles</h4>
                        <ul>
                            {modules.map((title, index) => {
                                return <li key={index} className='m-2'>{title.name}</li>
                            })}
                        </ul>
                    </Card>
                    <Card className='progress'>
                        <h4 className='flex justify-center text-xl m-2'>Progress</h4>
                        <div className='divProgress'>
                            <Progress aria-label="Loading..." value={50} className="max-w-md"/>
                        </div>
                    </Card>
                </CardBody>
            </Card>
        </main>
    )
}

export default ProfileUser;