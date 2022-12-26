import TableHead from '@mui/material/TableHead';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import BeenhereOutlinedIcon from '@mui/icons-material/BeenhereOutlined';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import BeenhereTwoToneIcon from '@mui/icons-material/BeenhereTwoTone';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import { useDispatch, useSelector } from 'react-redux';
import { FORM_AUTHORIZATION_OPEN, LOG_OUT } from '../../RTK/reducers';


const headCells = [
	{
		id: 'empty',
		numeric: false,
		label: '',
		isReadyToSort: false,
	},
	{
		id: 'ticker',
		numeric: false,
		label: 'Ticker',
		isReadyToSort: false,
	},
	{
		id: 'last_trade_time',
		numeric: true,
		label: 'Last trade time',
		isReadyToSort: false,
	},
	{
		id: 'price',
		numeric: true,
		label: 'Price',
		isReadyToSort: true,
	},
	{
		id: 'change',
		numeric: true,
		label: 'Change',
		isReadyToSort: true,
	},
	{
		id: 'change_percent',
		numeric: true,
		label: 'Change percent',
		isReadyToSort: true,
	},
];


export const EnhancedTableToolbar = ({ isFavoriteListOpen, handleOpenFavoriteList }) => {
	const dispatch = useDispatch();
	const isAuthorized = useSelector(state => state.finance.isAuthorized);

	return (
		<Toolbar
			sx={{
				pl: { sm: 2 },
				pr: { xs: 1, sm: 1 }
			}} >

			<Typography
				sx={{ flex: '1 1 100%' }}
				variant="h6"
				id="tableTitle"
				component="div"
				color="primary"
			>
				Finance table
			</Typography>

			<Button variant="contained" endIcon={isAuthorized ? <LogoutIcon /> : <LoginIcon />}
				onClick={() => isAuthorized ? dispatch(LOG_OUT()) : dispatch(FORM_AUTHORIZATION_OPEN())} >
				{isAuthorized ? 'Logout' : 'Login'}
			</Button>

			{isFavoriteListOpen ? (
				<Tooltip title="Open all tickers list"  >
					<IconButton onClick={() => handleOpenFavoriteList(!isFavoriteListOpen)} color="primary" >
						<BeenhereTwoToneIcon />
					</IconButton>
				</Tooltip>
			) : (
				<Tooltip title="Open favorite tickers list"  >
					<IconButton onClick={() => handleOpenFavoriteList(!isFavoriteListOpen)} color="primary" >
						<BeenhereOutlinedIcon />
					</IconButton>
				</Tooltip>
			)}
		</Toolbar>
	);
};


export function EnhancedTableHead(props) {
	const { order, orderBy, onRequestSort } = props;
	const createSortHandler = (property) => (event) => {
		onRequestSort(event, property);
	};

	return (
		<TableHead>
			<TableRow>
				{headCells.map((headCell) => (
					(headCell.isReadyToSort) ?
						<TableCell
							key={headCell.id}
							align={headCell.numeric ? 'right' : 'left'}
							padding={headCell.disablePadding ? 'none' : 'normal'}
							sortDirection={orderBy === headCell.id ? order : false}
						>
							<TableSortLabel
								active={orderBy === headCell.id}
								direction={orderBy === headCell.id ? order : 'asc'}
								onClick={createSortHandler(headCell.id)}
							>
								{headCell.label}
								{orderBy === headCell.id ? (
									<Box component="span" sx={visuallyHidden}>
										{order === 'desc' ? 'sorted descending' : 'sorted ascending'}
									</Box>
								) : null}
							</TableSortLabel>
						</TableCell>
						:
						<TableCell
							key={headCell.id}
							align={headCell.numeric ? 'right' : 'left'}
							padding={headCell.disablePadding ? 'none' : 'normal'}	>
							{headCell.label}
						</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}

EnhancedTableHead.propTypes = {
	onRequestSort: PropTypes.func.isRequired,
	order: PropTypes.oneOf(['asc', 'desc']).isRequired,
	orderBy: PropTypes.string.isRequired,
};