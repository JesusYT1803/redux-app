import React from "react";
import { Paper, Divider, Button, List, Tabs, Tab } from "@mui/material";
import { AddField } from "./components/AddField";
import { Item } from "./components/Item";

function App() {
	const [completedCheck, setCompletedCheck] = React.useState(true);
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

		return state;
	}

	const [state, dispatch] = React.useReducer(reducer, [
		{
			id: Math.random().toString(36).substr(2, 9),
			text: "первая задача",
			completed: false,
		},
	]);

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
		console.log(e);
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
	return (
		<div className="App">
			<Paper className="wrapper">
				<Paper className="header" elevation={0}>
					<h4>Список задач</h4>
				</Paper>
				<AddField onAdd={addTask} />
				<Divider />
				<Tabs value={0}>
					<Tab label="Все" />
					<Tab label="Активные" />
					<Tab label="Завершённые" />
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