import Vue from 'vue'
import Vuex from 'vuex'
import firebase from "firebase/app";
import "firebase/auth";
import db from "../firebase/firebaseInit";
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        blogCards: [{
                blogTitle: "Blog Card 1",
                blogCoverPhoto: "stock-1",
                blogDate: "1-1-2022",
            },
            {
                blogTitle: "Blog Card 2",
                blogCoverPhoto: "stock-2",
                blogDate: "2-1-2022",
            },
            {
                blogTitle: "Blog Card 3",
                blogCoverPhoto: "stock-3",
                blogDate: "3-1-2022",
            },
            {
                blogTitle: "Blog Card 4",
                blogCoverPhoto: "stock-4",
                blogDate: "4-1-2022",
            },
        ],
        postLoaded: null,
        blogHTML: "",
        blogTitle: "",
        blogPhotoName: "",
        blogPhotoFileURL: null,
        blogPhotoPreview: null,

        editPostBlog: null,
        user: null,
        profileAdmin: null,
        profileEmail: null,
        profileFirstName: null,
        profileLastName: null,
        profileUsername: null,
        profileId: null,
        profileInitials: null,
    },
    mutations: {
        TOOGLE_EDIT_POST(state, payload) {
            state.editPostBlog = payload
        },
        GET_CURRENT_USER_INFO(state, userResult) {
            state.profileId = userResult.id
            state.profileEmail = userResult.data().email
            state.profileFirstName = userResult.data().firstName
            state.profileLastName = userResult.data().lastName
            state.profileUsername = userResult.data().userName
        },
        setProfileInitials(state) {
            state.profileInitials =
                state.profileFirstName.match(/(\b\S)?/g).join("") + state.profileLastName.match(/(\b\S)?/g).join("");
        },
        USER_TRAC(state, payload) {
            state.user = payload
        },
        CHANGE_FIRST_NAME(state, payload) {
            state.profileFirstName = payload
        },
        CHANGE_LAST_NAME(state, payload) {
            state.profileLastName = payload
        },
        CHANGE_USER_NAME(state, payload) {
            state.profileUsername = payload
        },
        CHANGE_EMAIL(state, payload) {
            state.profileEmail = payload
        },
        NEW_BLOG_POST(state, payload) {
            state.blogHTML = payload
        },
        NEW_BLOG_TITLE(state, payload) {
            state.blogTitle = payload
        },
        BLOG_PHOTO_NAME_CHANGE(state, payload) {
            state.blogPhotoName = payload
        },
        CREATE_BLOG_URL(state, payload) {
            state.blogPhotoFileURL = payload
        },
        OPEN_PHOTO_PREVIEW(state) {
            state.blogPhotoPreview = !state.blogPhotoPreview
        }



    },
    actions: {
        async getCurrentUser({ commit }) {
            const currentUser = await db.collection('user').doc(firebase.auth().currentUser.uid).get()
            commit('GET_CURRENT_USER_INFO', currentUser)
            commit('setProfileInitials')
        },
        async profileUpdate({ commit, state }) {
            const user = await db.collection('user').doc(state.profileId)
            await user.update({
                firstName: state.profileFirstName,
                lastName: state.profileLastName,
                userName: state.profileUsername,
            })
            commit('setProfileInitials')
        }
    },
    modules: {}
})