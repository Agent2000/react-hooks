import "./App.css";
import { useFetch } from "./useFetch";

const URL = "https://jsonplaceholder.typicode.com/posts";

export function App() {
  const { data, isLoading, error, refetch } = useFetch(URL);

  return (
    <>
      {error && <p>Ошибка: {error}</p>}
      <div>
        <button onClick={refetch}>{isLoading ? "Загрузка..." : "Обновить"}</button>
        {data && (
          <div class={"container"}>
            <ul>
              {data.map((item) => (
                <li key={item.id}>
                  <p>{item.title}</p>
                  <div>{item.body}</div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
