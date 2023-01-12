import React, {useEffect, useState} from 'react';
import './index.css';
import {Header} from './components/Header';
import Pagination from '@mui/material/Pagination';
import {mapPets} from './mapPets';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import noPetFound from './images/no_image_available.jpeg';

function App() {
	const featuredPets = mapPets.filter(item => item.featured === true);
	const topFeaturedPets = featuredPets.slice(0,3);
	const imagesPerPage = 9;
	const [pageNumber, setPageNumber] = useState(1);
	const owners = [...new Set(mapPets.map(item => item.Owner))];
	const species = [...new Set(mapPets.map(item => item.Species))];
	const breed= [...new Set(mapPets.map(item => item.Breed))];
	const [nonFeaturedPets, setNonFeaturedPets] = useState(mapPets.filter(item => item.featured !== true));
	const [featuredPetsOpenDialog, setFeaturedPetsOpenDialog] = React.useState(false);
	const [selectedFeaturePetIndex, setSelectedFeaturePetIndex] = useState(null);
	const [selectedFeaturedPet, setSelectedFeaturedPet] = useState('');
	const [nonFeaturedPetsOpenDialog,setNonFeaturedPetsOpenDialog] = useState(false);
	const [filteredPetsOpenDialog,setFilteredPetsOpenDialog] = useState(false);
	const [selectedNonFeaturePetIndex,setSelectedNonFeaturePetIndex] = useState(null);
	const [selectedFilteredPetIndex,setSelectedFilteredPetIndex] = useState(null);
	const [selectedNonFeaturedPet, setSelectedNonFeaturedPet] = useState('');
	const [selectedFilteredPet, setSelectedFilteredPet] = useState('');
	const [selectedFilter, setSelectedFilter] = useState('');
	const [openFilterDialog, setOpenFilterDialog] = useState(false);
	const [filterPets, setFilterPets] = useState([]);
	const [filteredPetsToShow, setFilteredPetsToShow] = useState([]);

	const handlePageChange = (e, pageNumber) => {
		setPageNumber(pageNumber);
	};

	const handleFeaturedClickOpen = (item) => {
		console.log('item: ', item);
		setFeaturedPetsOpenDialog(true);
		const findSelectedIndex = topFeaturedPets.findIndex(featPets => featPets.Petsname === item.Petsname)
		setSelectedFeaturePetIndex(findSelectedIndex);
		setSelectedFeaturedPet(topFeaturedPets[findSelectedIndex]);
	 };

	const handleNonFeaturedClickOpen = (item) => {
		console.log('item: ', item);
		setNonFeaturedPetsOpenDialog(true);
		const findSelectedIndex = nonFeaturedPets.findIndex(featPets => featPets.Petsname === item.Petsname)
		setSelectedNonFeaturePetIndex(findSelectedIndex);
		setSelectedNonFeaturedPet(nonFeaturedPets[findSelectedIndex]);
	 };

	const handleFilteredPetsClick = (item) => {
		console.log('item: ', item);
		setFilteredPetsOpenDialog(true);
		const findSelectedIndex = filterPets.findIndex(filtPet => filtPet.Petsname === item.Petsname)
		setSelectedFilteredPetIndex(findSelectedIndex);
		setSelectedFilteredPet(filterPets[findSelectedIndex]);
	 };

	const handleClose = () => {
		setFeaturedPetsOpenDialog(false);
		setNonFeaturedPetsOpenDialog(false);
		setOpenFilterDialog(false);
		setFilteredPetsOpenDialog(false);
	};

	useEffect(()=> {
		if(pageNumber === 1) {
			console.log('*** I"m called  coz of page number change***');
			setNonFeaturedPets(mapPets.filter(item => item.featured !== true).slice(0,6))
		}else if (pageNumber === 2) {
			setNonFeaturedPets(mapPets.filter(item => item.featured !== true).slice(7, 7 + imagesPerPage))
		} else {
			setNonFeaturedPets(mapPets.filter(item => item.featured !== true).slice(17, 17 + imagesPerPage))
		}
	}, [pageNumber]);

	useEffect(()=> {
		if(selectedFilter) {
			if(pageNumber === 1) {
				console.log('*** I"m called coz ***');
				console.log('filterPets : ', filterPets);
				console.log('filterPets sliced : ', filterPets.slice(0,9));
				setFilteredPetsToShow(filterPets.slice(0,9));
			}else if (pageNumber === 2) {
				console.log('filterPets : ', filterPets);
				console.log('filterPets sliced : ', filterPets.slice(9,9 + imagesPerPage));
				setFilteredPetsToShow(filterPets.slice(9,9 + imagesPerPage));
			} else {
				setFilteredPetsToShow(filterPets.slice(20, 20 + imagesPerPage));
			}
		}
	}, [selectedFilter, pageNumber]);


	const handleFilterClick = () => {
		setOpenFilterDialog(true);
	}

	const handleChange = (e) => {
		const selectedString = e.target.value.toString();
		setSelectedFilter(selectedString);
		if(species.includes(selectedString)) {
			setFilterPets(mapPets.filter(item => item.Species === selectedString))
			setPageNumber(1);
		}
		if(breed.includes(selectedString)) {
			setFilterPets(mapPets.filter(item => item.Breed === selectedString))
			setPageNumber(1);
		}
		if(owners.includes(selectedString)) {
			setFilterPets(mapPets.filter(item => item.Owner === selectedString))
			setPageNumber(1);
		}
	}

	return (
		<div>
			<Header/>

			<div class="container">
			<div className="filterSection">
				<h6 className='heading'>fearured pets</h6>
				<button onClick={handleFilterClick} className="btn btn-primary btn-custom">filter</button>
				<Dialog
					onClose={handleClose}
					aria-labelledby="customized-dialog-title"
					open={openFilterDialog}
					>
						<DialogTitle id="alert-dialog-title">
							Filter pets based on owner/tag
							</DialogTitle>
							<DialogContent>
							<FormControl>
							<RadioGroup onChange={handleChange} value={selectedFilter}>
								{species.map(item => <FormControlLabel
									control={
									<Radio name={item} />
									}
									label={item}
									value={item}
								/>)}

								{breed.map(item => <FormControlLabel
														control={
														<Radio name={item} />
														}
														label={item}
														value={item}
													/>)}

								{owners.map(item => <FormControlLabel
														control={
														<Radio name={item} />
														}
														label={item}
														value={item}
													/>)} 
								
        					</RadioGroup>
				</FormControl>
							</DialogContent>
				</Dialog>
			</div>

			{pageNumber === 1 && filterPets.length <= 0 && <div className="row">
				{topFeaturedPets.map((item, index) => (
				<div className='col-sm-12 col-md-6 col-lg-4 col-xl-4 '>
					<>
					{console.log('item.imageSrc: ', item.imageSrc)}
						<img
							src={item.imageSrc !== undefined ? `${item.imageSrc}?w=164&h=164&fit=crop&auto=format` : noPetFound}
							srcSet={item.imageSrc !== undefined ?  `${item.imageSrc}?w=164&h=164&fit=crop&auto=format&dpr=2 2x` : noPetFound}
							alt={item.Petsname}
							loading="lazy"
							onClick={() => handleFeaturedClickOpen(item)}
							className="img-custom"
						/>
						<Dialog
							onClose={handleClose}
							aria-labelledby="customized-dialog-title"
							open={featuredPetsOpenDialog}
						>
							<DialogContent dividers>
							<CardMedia
								sx={{ height: 500 }}
								image={`${selectedFeaturedPet.imageSrc}`}
								title="green iguana"
							/>
							<CardContent>
							<Typography gutterBottom variant="h5" component="div">
								{selectedFeaturedPet.Petsname}
								</Typography>
								<hr/>
								<Typography gutterBottom variant="h5" component="div">
								{selectedFeaturedPet.DOB}
								</Typography>
								<Typography gutterBottom variant="subtitle2" component="body1" className="tag-custom">
								{selectedFeaturedPet.Breed}
								</Typography>
								<Typography gutterBottom variant="subtitle2" component="body1" className="tag-custom">
								{selectedFeaturedPet.Species}
								</Typography>
								<Typography gutterBottom variant="subtitle2" component="body1" className="tag-custom">
								{selectedFeaturedPet.Owner}
								</Typography>
								<Typography variant="body2" color="text.secondary">
									{selectedFeaturedPet.Summary}
								</Typography>
							</CardContent>
							</DialogContent>
						</Dialog>
					</>
				</div>
				))}
			</div>}

			{filterPets.length <= 0 && <div className="filterSection">
				<h6 className='heading'>All pets</h6>
			</div>}


			{filterPets.length <= 0 && <div className="row">
				{nonFeaturedPets.map((item, index) => (
				<div className='col-sm-12 col-md-6 col-lg-4 col-xl-4 '>
					<>
						<img
							src={item.imageSrc !== undefined ? `${item.imageSrc}?w=164&h=164&fit=crop&auto=format` : noPetFound}
							srcSet={item.imageSrc !== undefined ?  `${item.imageSrc}?w=164&h=164&fit=crop&auto=format&dpr=2 2x` : noPetFound}
							alt={item.Petsname}
							loading="lazy"
							onClick={() => handleNonFeaturedClickOpen(item)}
							className="img-custom"
						/>
						<Dialog
							onClose={handleClose}
							aria-labelledby="customized-dialog-title"
							open={nonFeaturedPetsOpenDialog}
						>
							<DialogContent dividers>
							<CardMedia
							 	component="img"
								image={`${selectedNonFeaturedPet.imageSrc}`}
								sx={{ height: 500 }}
							/>
							<CardContent>
							<Typography gutterBottom variant="h5" component="div">
								{selectedNonFeaturedPet.Petsname}
								</Typography>
								<hr/>
								<Typography gutterBottom variant="h5" component="div">
								{selectedNonFeaturedPet.DOB}
								</Typography>
								<Typography gutterBottom variant="subtitle2" component="body1" className="tag-custom">
								{selectedNonFeaturedPet.Breed}
								</Typography>
								<Typography gutterBottom variant="subtitle2" component="body1" className="tag-custom">
								{selectedNonFeaturedPet.Species}
								</Typography>
								<Typography gutterBottom variant="subtitle2" component="body1" className="tag-custom">
								{selectedNonFeaturedPet.Owner}
								</Typography>
								<Typography variant="body2" color="text.secondary">
									{selectedNonFeaturedPet.Summary}
								</Typography>
							</CardContent>
							</DialogContent>
						</Dialog>
					</>
				</div>
				))}
			</div>}

			{filterPets.length > 0 && <div className="row">
				{filteredPetsToShow.map((item, index) => (
					<div className='col-sm-12 col-md-6 col-lg-4 col-xl-4 '>
					<>
						<img
							src={item.imageSrc !== undefined ? `${item.imageSrc}?w=164&h=164&fit=crop&auto=format` : noPetFound}
							srcSet={item.imageSrc !== undefined ?  `${item.imageSrc}?w=164&h=164&fit=crop&auto=format&dpr=2 2x` : noPetFound}
							alt={item.Petsname}
							loading="lazy"
							onClick={() => handleFilteredPetsClick(item)}
							className="img-custom"
						/>
						<Dialog
							onClose={handleClose}
							aria-labelledby="customized-dialog-title"
							open={filteredPetsOpenDialog}
						>
							<DialogContent dividers>
							<CardMedia
							 	component="img"
								image={`${selectedFilteredPet.imageSrc}`}
								sx={{ height: 500 }}
							/>
							<CardContent>
							<Typography gutterBottom variant="h5" component="div">
								{selectedFilteredPet.Petsname}
								</Typography>
								<hr/>
								<Typography gutterBottom variant="h5" component="div">
								{selectedFilteredPet.DOB}
								</Typography>
								<Typography gutterBottom variant="subtitle2" component="body1" className="tag-custom">
								{selectedFilteredPet.Breed}
								</Typography>
								<Typography gutterBottom variant="subtitle2" component="body1" className="tag-custom">
								{selectedFilteredPet.Species}
								</Typography>
								<Typography gutterBottom variant="subtitle2" component="body1" className="tag-custom">
								{selectedFilteredPet.Owner}
								</Typography>
								<Typography variant="body2" color="text.secondary">
									{selectedFilteredPet.Summary}
								</Typography>
							</CardContent>
							</DialogContent>
						</Dialog>
					</>
				</div>
				))}
			</div>}

			<Pagination count={3} onChange={handlePageChange} page={pageNumber} className="pagination-custom"/>
			</div>
		</div>
	);
}

export default App;