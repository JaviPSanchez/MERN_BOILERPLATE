import Hotel from "../models/Hotel.js";

// GET BY PROPERTY

export const getByProperty = async (req, res, next) => {
  console.log("getByProperty:", req.query);
  const type = req.query.type.split(",");
  console.log(type);
  try {
    const properties = await Promise.all(
      type.map((item) => {
        return Hotel.find({ type: item.toLowerCase() });
      })
    );
    console.log(properties);
    res.status(200).json(properties);
  } catch (err) {
    next(err);
  }
};
