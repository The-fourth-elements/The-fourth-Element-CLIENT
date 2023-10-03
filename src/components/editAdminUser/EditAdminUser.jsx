"use client"
import { useEffect, useState } from 'react';
import { useUserDetail } from '@/zustand/store/userDetail';
import { Card, CardHeader, CardBody, Image, CircularProgress, select } from '@nextui-org/react';
import { EditIcon } from '@/assets/svg-jsx/EditIcon';
import "./styles.scss"
import { useNationAndCity } from '@/zustand/store/countryAndCityID';

const EditAdminUser = ({id}) => {
    
    const { detail, getDetail, updateUserRole } = useUserDetail();
	const {getCityId, getCountryId, stringCity, stringCountry} = useNationAndCity()
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [changePlan, setChangePlan] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null); 
  const [showBackdrop, setShowBackdrop] = useState(false);
	let [country, setCountry] = useState(stringCountry);
	let [city, setCity] = useState(stringCity);


  useEffect(() => {
    if (id) {
      getDetail(id);
    }
	if(detail.username && Object.keys(detail).length > 0){
		getCountryId(detail.nation)
		getCityId(detail.city)
	}
	if (stringCity !== "" && stringCountry !== ""){
		setCity(stringCity)
		setCountry(stringCountry)
	}
  }, [ detail.role, stringCity, stringCountry, id]);


  const handleChangePlan = () => {
    setChangePlan(!changePlan);
  };

  const handleChangeModal = () => {
    setShowConfirmationModal(!showConfirmationModal);
	setShowBackdrop(!showBackdrop);

  };

  const selectPlan = (event) => {
    setSelectedPlan(event.target.value);
  };

  const updateRole = () => {
	if (selectedPlan !== null) {
	  updateUserRole({id: id, role: selectedPlan});
	  setChangePlan(!changePlan);
	  handleChangeModal();
	  setSelectedPlan(null)
	}
  };


    return (
		<article>
			{showBackdrop && <div className="backdrop"></div>}
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
                            <button
								disabled={selectedPlan === null}
								title="Change Plan"
								onClick={handleChangeModal}
								 
							> Accept </button>
                            <button title="Back to" onClick={handleChangePlan}>↩</button>
                            </h2>)}
                        </div>
						{showConfirmationModal && (
							<div className="confirmation-modal">
							<div className="modal-content">
								<p>Are you sure you want to change the role?</p>
								<button onClick={updateRole}>Change Plan</button>
								<button onClick={handleChangeModal}>Cancel</button>
							</div>
							</div>
						)}
						<h2>Country: {country}</h2>
						<h2>City: {city}</h2>
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