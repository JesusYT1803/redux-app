import React from "react";
import { Paper, Divider, Button, List, Tabs, Tab } from "@mui/material";
import { AddField } from "./components/AddField";
import { Item } from "./components/Item";

function App() {
	const [completedCheck, setCompletedCheck] = React.useState(true);
	const [state, dispatch] = React.useReducer(reducer, [
		{
			id: Math.random().toString(36).substr(2, 9),
			text: "первая задача",
			completed: false,
		},
	]);

	console.log(state);
	function reducer(state, action) {
		if (action.type === "ADD_TASK") {
			return [
				...state,
				{
					id: Math.random().toString(36).substr(2, 9),
					text: action.payload.text,
					completed: action.payload.checked,
				},
			];
		}
		if (action.type === "REMOVE_ITEMS") {
			let newState = state.filter(
				(item) => item.id !== action.payload.removeNumber
			);

			return newState;
		}
		if (action.type === "CHECKED_COMPLETED") {
			return state.filter((item) => {
				if (action.payload.numbers === item.id) {
					item.completed = !item.completed;
				}
				return item;
			});
		}

		if (action.type === "ALL_CHECKED_ITEMS") {
			return state.map((e) => ({ ...e, completed: action.payload }));
		}
		if (action.type === "CLEAR_STATE_ITEMS_ALL") {
			return [];
		}
		if (action.type === "TAB_CHECKED_ALL_SEEN_ITEMS") {
			return state;
		}

		if (action.type === "TAB_CHECKED_ALL_END_ITEMS") {
			return [...state].filter((e) => e.completed === true);
		}
		if (action.type === "TAB_CHECKED_ALL_OPEN_ITEMS") {
			return [...state].filter((e) => e.completed === false);
		}

		return state;
	}

	const addTask = (text, checked) => {
		dispatch({
			type: "ADD_TASK",
			payload: {
				text,
				checked,
			},
		});
	};

	const remoteItems = (e) => {
		dispatch({
			type: "REMOVE_ITEMS",
			payload: {
				removeNumber: e,
			},
		});
	};
	const checkedCompletedOnClick = (number) => {
		console.log(number);

		dispatch({
			type: "CHECKED_COMPLETED",
			payload: {
				numbers: number,
			},
		});
	};
	const clearStateItemsAll = () => {
		dispatch({
			type: "CLEAR_STATE_ITEMS_ALL",
		});
	};

	const clickAllChecked = () => {
		setCompletedCheck((prev) => !prev);
		dispatch({
			type: "ALL_CHECKED_ITEMS",
			payload: completedCheck,
		});
	};
	
	const tabCheckedAll = (e) => {
		if (e === "all") {
			console.log("all");
			dispatch({
				type: "TAB_CHECKED_ALL_SEEN_ITEMS",
			});
		} else if (e === true) {
			console.log("true");
			dispatch({
				type: "TAB_CHECKED_ALL_OPEN_ITEMS",
			});
		} else if (e === false) {
			console.log("false");
			dispatch({
				type: "TAB_CHECKED_ALL_END_ITEMS",
			});
		}
	};
	return (
		<div className="App">
			<Paper className="wrapper">
				<Paper className="header" elevation={0}>
					<h4>Список задач</h4>
				</Paper>
				<AddField onAdd={addTask} />
				<Divider />
				<Tabs value={0}>
					<Tab
						onClick={() => {
							tabCheckedAll("all");
						}}
						label="Все"
					/>
					<Tab
						onClick={() => {
							tabCheckedAll(true);
						}}
						label="Активные"
					/>
					<Tab
						onClick={() => {
							tabCheckedAll(false);
						}}
						label="Завершённые"
					/>
				</Tabs>
				<Divider />
				<List>
					{state.map((obj) => (
						<Item
							checkedCompletedOnClick={checkedCompletedOnClick}
							remoteItems={remoteItems}
							objId={obj.id}
							key={obj.id}
							text={obj.text}
							completed={obj.completed}
						/>
					))}
				</List>
				<Divider />
				<div className="check-buttons">
					<Button onClick={clickAllChecked}>Отметить всё</Button>
					<Button onClick={clearStateItemsAll}>Очистить </Button>
				</div>
			</Paper>
		</div>
	);
}

export default App;