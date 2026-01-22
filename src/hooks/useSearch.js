import { useState, useMemo } from "react"

export function useSearch(list, field) {
  const [search, setSearch] = useState("")

  const filteredList = useMemo(() => {
    if (!search) return list

    return list.filter(item =>
      item[field]
        ?.toString()
        .toLowerCase()
        .includes(search.toLowerCase())
    )
  }, [search, list, field])

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
    filteredList,
    handleChange,
    handleKeyDown,
    isSearching: search.trim().length > 0
  }
}
