export const checkRole = async (roles, req, res, next) => {
  try {
    const userRole = res.user.role;
    console.log("User Role", userRole);
    console.log("Roles", roles);
    if (roles.includes(userRole)) {
      next();
    } else {
      res.status(403).json({ message: "Forbidden" });
    }
  } catch (error) {
    res.status(500).json({message: error.message})
  }
};
