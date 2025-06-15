const authStore = (set) => ({
  token: "",
  user: null,
  userSchool: null,
  permissions: null,
  roles: null,
  session: null,
  setToken: (token) => {
    set((state) => ({
      ...state,
      token,
    }));
  },
  setPermissions: (permissions) => {
    set((state) => ({
      ...state,
      permissions,
    }));
  },
  setRoles: (roles) => {
    set((state) => ({
      ...state,
      roles,
    }));
  },
  setUser: (user) => {
    set((state) => ({
      ...state,
      user,
    }));
  },
  setUserSchool: (userSchool) => {
    set((state) => ({
      ...state,
      userSchool,
    }));
  },
  setSession: (session) => {
    set((state) => ({
      ...state,
      session,
    }));
  },
  reset: () => {
    set(() => ({
      token: null,
      user: null,
      userSchool: null,
      permissions: null,
      session: null,
    }))
  }
});

export default authStore;