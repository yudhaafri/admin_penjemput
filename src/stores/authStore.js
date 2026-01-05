const authStore = (set) => ({
  token: "",
  user: null,
  userSchool: null,
  permissions: null,
  roles: null,
  session: null,
  level: null,
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
  setLevel: (level) => {
    set((state) => ({
      ...state,
      level,
    }));
  },
  reset: () => {
    set(() => ({
      token: null,
      user: null,
      userSchool: null,
      permissions: null,
      session: null,
      level: null,
    }));
  },
});

export default authStore;
