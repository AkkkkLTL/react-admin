import { useMemo } from "react";
import { useParams as _userParams } from "react-router-dom";

export function useParams() {
	const params = _userParams();
	return useMemo(() => params, [params]);
}
