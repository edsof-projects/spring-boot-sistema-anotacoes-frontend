import { useState, useMemo } from "react"

export function useSearch(list = [], fields = []) {
  const [search, setSearch] = useState("");

  const filtrados = useMemo(() => {
    if (!search.trim()) return list;

    const termo = search.toLowerCase();

    return list.filter(item =>
      fields.some(field =>
        item[field]?.toString().toLowerCase().includes(termo)
      )
    );
  }, [search, list, fields]);

  function handleChange(e) {
    setSearch(e.target.value)
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault()
      setSearch("")
    }
  }

  return {
    search,
    setSearch,
    filtrados,
    handleChange,
    handleKeyDown,
    isSearching: search.trim().length > 0
  }
}
