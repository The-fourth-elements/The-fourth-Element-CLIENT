"use client"
import { useEffect, useState } from 'react';
import { useUserDetail } from '@/zustand/store/userDetail';
import { Card, CardHeader, CardBody, Image, CircularProgress, select } from '@nextui-org/react';
import { EditIcon } from '@/assets/svg-jsx/EditIcon';
import "./styles.scss"

const EditAdminUser = ({id}) => {
    
    const { detail, getDetail, updateUserRole } = useUserDetail();
    useEffect(()=> {
        if(id){
            getDetail(id)
        } 
    }, [id, detail.role])

    const [currentPlan, setCurrentPlan] = useState(detail.role);
    const [changePlan, setChangePlan] = useState(false)

    const handleChangePlan = () => {
        setChangePlan(!changePlan)
    } 

    const selectPlan = (event) => {
        detail.role = event.target.value

    }
    const updateRole = () => {
        detail.id = id
        updateUserRole(detail)
        setChangePlan(!changePlan)
    }


    return (
		<article>
			 
			{detail.username && Object.keys(detail).length > 0 ? (
				<Card className='main'>
					<CardHeader className='elHeader'>
						<h1>Name: {detail.username}</h1>
						{detail.profile_img ? <Image
							src={detail.profile_img}
							alt={detail.name}
						/>: <Image
						src='https://cdn.pnghd.pics/data/862/user-profile-png-15.png'
						alt={detail.name}
					/>}
					</CardHeader>
					<CardBody className='elBody'>
						<h2>Email: {detail.email}</h2>
                        <div className='editPlan'>
                        {!changePlan ? (detail.role === 0 ? (
							<h2>Plan: Free Plan <button title="Edit Plan" onClick={handleChangePlan}><EditIcon/></button></h2>
						) : detail.role === 1 ? (
							<h2>Plan: Pay Plan <button title="Edit Plan" onClick={handleChangePlan}><EditIcon/></button></h2>
						) : (
							<h2>Plan: Admin <button title="Edit Plan" onClick={handleChangePlan}><EditIcon/></button></h2>)
						) : (<h2>Plan: <select onChange={selectPlan}>
                                <option value="" disabled selected>Select a plan</option>
                                <option value={0}>Free Plan</option>
                                <option value={1}>Pay plan</option>
                                <option value={2}>Admin</option>
                            </select>
                            <button title="Change Plan" onClick={updateRole}> Accept </button>
                            <button title="Back to" onClick={handleChangePlan}>↩</button>
                            </h2>)}
                        </div>
						<h2>Country: {detail.nationality}</h2>
						<h2>City: {detail.city}</h2>
						<h2>
							Registration date:{' '}
							{new Date(detail.createdAt).toLocaleDateString()}
						</h2>
					</CardBody>
				</Card>
			) : (
				<div className='centered'>
					<CircularProgress
						className='loading'
						label='Loading...'
						color='warning'
					/>
				</div>
			)}
		</article>
	);
}

export default EditAdminUser;