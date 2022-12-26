function sortList(array, order, orderBy) {
	let sortedList = [...array];
	switch (order) {
		case 'desc':
			sortedList.sort((a, b) => b[orderBy] - a[orderBy]);
			return sortedList;
		case 'asc':
			sortedList.sort((a, b) => a[orderBy] - b[orderBy]);
			return sortedList;
		default:
			return array;
	}
}

function saveStorageAuthorizationStatus(status) {
	const isAuthorized = JSON.stringify(status);
	sessionStorage.setItem('isAuthorized', isAuthorized);
}


export { sortList, saveStorageAuthorizationStatus };