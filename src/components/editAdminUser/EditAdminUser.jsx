'use client';
import { useEffect, useState } from 'react';
import { useUserDetail } from '@/zustand/store/userDetail';
import {
	Card,
	CardHeader,
	CardBody,
	Image,
	CircularProgress,
	select,
} from '@nextui-org/react';
import { EditIcon } from '@/assets/svg-jsx/EditIcon';
import './styles.scss';
import { useNationAndCity } from '@/zustand/store/countryAndCityID';
import { Modal } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import ModalChanges from '@/helpers/ModalChanges';
const EditAdminUser = ({ id }) => {
	const { data: session } = useSession();
	const { detail, getDetail, updateUserRole } = useUserDetail();
	const { getCityId, getCountryId, stringCity, stringCountry } =
		useNationAndCity();
	const [showConfirmationModal, setShowConfirmationModal] = useState(false);
	const [changePlan, setChangePlan] = useState(false);
	const [selectedPlan, setSelectedPlan] = useState(null);
	const [showBackdrop, setShowBackdrop] = useState(false);
	let [country, setCountry] = useState('');
	let [city, setCity] = useState('');
	const router = useRouter();
	const [updated, setUpdated] = useState(false);

	useEffect(() => {
		if (id) {
			getDetail(id);
		}
		if (id && updated) {
			getDetail(id);
			setUpdated(false);
		}
		if (detail?.username && Object.keys(detail).length > 0) {
			setCountry(detail?.nation?.name);
			setCity(detail?.city?.name);
		}
	}, [detail?.role, id, updated]);

	const handleChangePlan = () => {
		setChangePlan(!changePlan);
	};

	const handleChangeModal = () => {
		setShowConfirmationModal(!showConfirmationModal);
		setShowBackdrop(!showBackdrop);
		console.log(showConfirmationModal);
	};

	const selectPlan = event => {
		setSelectedPlan(event.target.value);
	};

	const updateRole = () => {
		console.log(showConfirmationModal);
		if (selectedPlan !== null) {
			updateUserRole({ id: id, role: selectedPlan });
			setChangePlan(!changePlan);
			handleChangeModal();
			setSelectedPlan(null);
			setUpdated(true);
		}
	};

	return (
		<article>
			{detail?.username && Object.keys(detail).length > 0 ? (
				<div className='main'>
					<div className='elHeader'>
						<h1>Nombre: {detail?.username}</h1>
						{detail?.profile_img ? (
							<Image src={detail?.profile_img?.secure_url} alt={detail?.name} />
						) : (
							// session?.token?.picture ? (
							// 	<Image src={session?.token?.picture} alt='profileImage' />
							// ) :
							<Image
								src='https://cdn.pnghd.pics/data/862/user-profile-png-15.png'
								alt={detail?.name}
							/>
						)}
					</div>
					<div className='elBody'>
						<h2>Email: {detail?.email}</h2>
						<div className='editPlan'>
							{!changePlan ? (
								detail?.role === 0 ? (
									<h2>
										Plan: Gratuito{' '}
										<button title='Edit Plan' onClick={handleChangePlan}>
											<EditIcon />
										</button>
									</h2>
								) : detail?.role === 1 ? (
									<h2>
										Plan: Pago{' '}
										<button title='Edit Plan' onClick={handleChangePlan}>
											<EditIcon />
										</button>
									</h2>
								) : (
									<h2>
										Plan: Moderador{' '}
										<button title='Edit Plan' onClick={handleChangePlan}>
											<EditIcon />
										</button>
									</h2>
								)
							) : (
								<h2>
									Plan:{' '}
									<select onChange={selectPlan}>
										<option value='' disabled selected>
											Seleccione un plan
										</option>
										<option value={0}>Gratuito</option>
										<option value={1}>Plan pago</option>
										<option value={2}>Moderador</option>
									</select>
									<button
										disabled={selectedPlan === null}
										title='Change Plan'
										onClick={handleChangeModal}>
										{' '}
										Aceptar{' '}
									</button>
									<button title='Back to' onClick={handleChangePlan}>
										↩
									</button>
								</h2>
							)}
						</div>
						{showConfirmationModal && (
							<ModalChanges
								isOpen={true}
								cerrador={handleChangeModal}
								pregunta='¿Seguro que desea cambiar el rol del usuario?'
								funcion={updateRole}
							/>
						)}
						<h2>País: {country}</h2>
						<h2>Ciudad: {city}</h2>
						<h2> Deporte: {detail?.sport?.name}</h2>
						<h2> Edad: {detail?.age} </h2>
						<h2> Años de experiencia: {detail?.expYearsSports} </h2>
						<h2>
							Registration date:{' '}
							{new Date(detail?.createdAt).toLocaleDateString()}
						</h2>
					</div>
				</div>
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
};

export default EditAdminUser;
