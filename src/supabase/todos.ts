import supabase from './service';
import { Todo } from './schema';

const TABLE = 'todos';

const getTodos = async (): Promise<Todo[]> => {
	const { data, error } = await supabase.from(TABLE).select('*');

	if (error) {
		throw new Error(error.message);
	}

	return data;
};

const addTodo = async (data: Omit<Todo, 'id'>) => {
	const { error: addTodoError } = await supabase.from(TABLE).insert(data).select();

	if (addTodoError) {
		throw new Error(addTodoError.message);
	}
};

const removeTodo = async ({ id }: { id: string }) => {
	const { error: deleteTodoError } = await supabase.from(TABLE).delete().eq('id', id);

	if (deleteTodoError) {
		throw new Error(deleteTodoError.message);
	}
};

export { getTodos, addTodo, removeTodo };