import produce from 'immer';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { API_FINA } from '../apis/ApisData';
const initialDepartemen = [];
const useDataDepartemen = create(
    persist(
        (set) => ({
            departemen: initialDepartemen,
            departemenReady: false,
            fetchDepartemen : async () => {
                let jo = {};
                let data = [];
                try {
                    const response = await API_FINA.get('select%20D.DEPTID,%20D.DEPTNO,%20D.DEPTNAME%20,D.SUBDEPTID%20,(select%20dp.deptno%20from%20DEPARTMENT%20dp%20where%20dp.DEPTID=d.SUBDEPTID)parentname%20from%20DEPARTMENT%20D%20where%20D.SUSPENDED=0/1');

                    let file = response.data.result[0].data;
                    for(let i = 0; i < file.length;i++){
                        let dataRow = file[i];
                        data.push({
                        deptId : dataRow[0], 
                        deptNo : dataRow[1], 
                        deptName : dataRow[2], 
                        subDeptId : dataRow[3], 
                        parentName : dataRow[4],
                        })
                    }
                    console.log(data)
                    
                    jo.departemen = data;
                    console.log(jo)
                    set(produce((state) => {
                        state.departemen = jo;
                        state.departemenReady = true;
                    }))
                } catch (error) {
                    console.log(error);
                }
            },
            falseMaterial : async () => {
                try {
                    set(produce((state) => {
                        state.departemenReady = false;
                    }))
                } catch (error) {
                    console.log(error);
                }
            },
        }),
        {
            name: 'departemen-storage',
            getStorage: () => localStorage,
        }
    )
);

export const selectDepartemen = (state) => state.departemen;
export const selectFetchDepartemen = (state) => state.fetchDepartemen;
export const selectDepartemenReady = (state) => state.departemenReady;
export const selectFalseDepartemen= (state) => state.falseMaterial;

export default useDataDepartemen;


