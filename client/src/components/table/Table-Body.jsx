import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setOrder, setOrderBy, setFavoriteList } from '../../RTK/reducers';
import { sortList } from "../../utilities/utilities";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Tooltip from '@mui/material/Tooltip';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { EnhancedTableHead, EnhancedTableToolbar } from "./Table-Head";
import AddCircleOutlineTwoToneIcon from '@mui/icons-material/AddCircleOutlineTwoTone';
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { format } from 'date-fns';


function EnhancedTable() {
	const dispatch = useDispatch();
	const priceTickersArray = useSelector(state => state.finance.priceTickersArray);
	const favoriteList = useSelector(state => state.finance.favoriteList);
	const [isFavoriteListOpen, setIsFavoriteListOpen] = useState(false);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const order = useSelector(state => state.finance.order);
	const orderBy = useSelector(state => state.finance.orderBy);


	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === 'asc';
		dispatch(setOrder(isAsc ? 'desc' : 'asc'))
		dispatch(setOrderBy(property))
	};


	const handleChangePage = (event, newPage) => {
		setPage(newPage)
	};


	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const handleOpenFavoriteList = (status) => {
		setIsFavoriteListOpen(status);
		setPage(0);
	}


	const createFavoriteListToShow = () => {
		let FavoriteListToShow = []
		favoriteList.forEach(favoriteItem => {
			let listWithFavoriteItem = priceTickersArray.filter((item) => item.ticker === favoriteItem);
			FavoriteListToShow = FavoriteListToShow.concat(listWithFavoriteItem);
		});
		return FavoriteListToShow;
	}


	const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - priceTickersArray.length) : 0;


	return (
		<Paper elevation={3} >
			<EnhancedTableToolbar isFavoriteListOpen={isFavoriteListOpen} handleOpenFavoriteList={handleOpenFavoriteList} />
			<TableContainer>
				<Table
					sx={{ minWidth: 400 }}
					aria-labelledby="tableTitle"
					size={'medium'}
				>
					<EnhancedTableHead
						order={order}
						orderBy={orderBy}
						onRequestSort={handleRequestSort}
					/>
					<TableBody>

						{sortList((isFavoriteListOpen) ? createFavoriteListToShow() : priceTickersArray, order, orderBy)
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((row, index) => {

								const labelId = `enhanced-table-checkbox-${index}`;
								const isInFavoriteList = favoriteList.includes(row.ticker);

								return (
									<TableRow key={labelId}>
										<TableCell>
											<Tooltip title={isInFavoriteList ?
												"Remove from favorites" : "Add to favorites"} placement="left" arrow={true} >
												<IconButton
													aria-label="expand row"
													onClick={() => { dispatch(setFavoriteList(row.ticker)) }}
													color="primary"
												>
													{isInFavoriteList ?
														<CheckCircleTwoToneIcon />
														:
														<AddCircleOutlineTwoToneIcon />
													}
												</IconButton>
											</Tooltip>
										</TableCell>
										<TableCell component="th" id={labelId} scope="row"	>{row.ticker}</TableCell>
										<TableCell align="right">{format(new Date(row.last_trade_time), 'dd.MM.uuuu, HH:mm:ss')}</TableCell>
										<TableCell align="right">{row.price}</TableCell>
										{(row.change >= 0) ?
											<TableCell align="right" sx={{ color: "green" }}>{`+${row.change}`}</TableCell>
											:
											<TableCell align="right" sx={{ color: "red" }}>{row.change}</TableCell>}
										<TableCell align="right">
											{(row.change_percent >= 0) ?
												<Chip variant="outlined" color="success" label={`${row.change_percent}%`} icon={<ArrowDropUpIcon />} />
												:
												<Chip variant="outlined" color="error" label={`${row.change_percent}%`} icon={<ArrowDropDownIcon />} />
											}
										</TableCell>
									</TableRow>
								);
							})}
						{emptyRows > 0 && (
							<TableRow
								style={{
									height: 53 * emptyRows,
								}}
							>
								<TableCell colSpan={6} />
							</TableRow>
						)}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[5, 10, 25]}
				component="div"
				count={(isFavoriteListOpen) ? favoriteList.length : priceTickersArray.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</Paper>
	);
}

export { EnhancedTable };