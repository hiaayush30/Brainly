// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { addContent, ContentInterface, ContentState } from './features/content/contentSlice'

// Define a service using a base URL and expected endpoints
type UserInterface={
    username:string;
    password:string;
}
export const brainlyApi = createApi({
    reducerPath: 'brainlyApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/v1/' }),
    tagTypes: ['content', 'user'],
    endpoints: (builder) => ({
        login:builder.mutation<void,UserInterface>({
           query:(data)=>({
            url:'login',
            body:data,
            method:"POST"
           })
        }),
        signup:builder.mutation<void,UserInterface>({
            query:(data)=>({
             url:'signup',
             body:data,
             method:"POST"
            })
         }),
        getContent: builder.query<ContentState, void>({
            query: () => `content`,
            providesTags: ['content'],
            async onQueryStarted(queryArgument, queryLifeCycleApi) {
                try {
                    const { data } = await queryLifeCycleApi.queryFulfilled;
                    data.forEach((content) => {
                        queryLifeCycleApi.dispatch(addContent(content))
                    })
                } catch (error) {
                    console.log(error)
                }
            }
        }),
        addContent:builder.mutation<void,ContentInterface>({
           query:(data) => ({
            url:'content',
            body:data,
            method:'POST'
           }),
           invalidatesTags:['content']
        }),
        deleteContent:builder.mutation<void,string>({
            query:(id)=>({
                url:'/content',
                method:'DELETE',
                body:id
            })
        }),
        shareContent:builder.mutation<void,boolean>({
            query:(data)=>({
                url:'brain/share',
                body:data,
                method:'POST'
            })
        }),
        getSharedContent:builder.query<ContentInterface,string>({
            query:(link)=>({
                url:'brain/'+link,
                method:'GET',
            })
        })
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetContentQuery } = brainlyApi