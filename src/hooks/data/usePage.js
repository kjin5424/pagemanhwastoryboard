import { useData } from "../../contexts/DataContext";

// 페이지 CRUD
export function usePage() {
  const { data, setData } = useData();

  // 복잡한 로직은 여기 한 곳에만
  const addPage = (episodeId) => {
    setData((prev) => {
      // ... 위의 복잡한 로직
    });
  };

  return { addPage };
}
