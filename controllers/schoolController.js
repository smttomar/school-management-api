import School from "../models/School.js";
import validator from "validator";

const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRadians = (degree) => {
        return degree * (Math.PI / 180);
    };

    const earthRadius = 6371; // Radius of Earth in KM

    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) *
            Math.cos(toRadians(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return earthRadius * c;
};

// Add School Controller
export const addSchool = async (req, res) => {
    try {
        const { name, address, latitude, longitude } = req.body;

        // Validation
        if (
            !name ||
            !address ||
            latitude === undefined ||
            longitude === undefined
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // Name Validation
        if (!validator.isLength(name, { min: 3 })) {
            return res.status(400).json({
                success: false,
                message: "School name must be at least 3 characters",
            });
        }

        // Address Validation
        if (!validator.isLength(address, { min: 5 })) {
            return res.status(400).json({
                success: false,
                message: "Address must be at least 5 characters",
            });
        }

        // Convert to Numbers
        const lat = Number(latitude);
        const lng = Number(longitude);

        // Latitude Longitude Validation
        if (isNaN(lat) || isNaN(lng)) {
            return res.status(400).json({
                success: false,
                message: "Latitude and Longitude must be valid numbers",
            });
        }

        // Latitude Range Validation
        if (lat < -90 || lat > 90) {
            return res.status(400).json({
                success: false,
                message: "Latitude must be between -90 and 90",
            });
        }

        // Longitude Range Validation
        if (lng < -180 || lng > 180) {
            return res.status(400).json({
                success: false,
                message: "Longitude must be between -180 and 180",
            });
        }

        // Create new school
        const school = await School.create({
            name,
            address,
            latitude: lat,
            longitude: lng,
        });

        // Success response
        res.status(201).json({
            success: true,
            message: "School added successfully",
            data: school,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message,
        });
    }
};

// List Schools Controller
export const listSchools = async (req, res) => {
    try {
        const { latitude, longitude } = req.query;

        // Validation
        if (latitude === undefined || longitude === undefined) {
            return res.status(400).json({
                success: false,
                message: "User latitude and longitude are required",
            });
        }

        // Convert into numbers
        const userLat = parseFloat(latitude);
        const userLng = parseFloat(longitude);

        // Check valid numbers
        if (isNaN(userLat) || isNaN(userLng)) {
            return res.status(400).json({
                success: false,
                message: "Latitude and Longitude must be valid numbers",
            });
        }

        // Fetch all schools
        const schools = await School.find();

        // Calculate distance for each school
        const schoolsWithDistance = schools.map((school) => {
            const distance = calculateDistance(
                userLat,
                userLng,
                school.latitude,
                school.longitude,
            );

            return {
                ...school._doc,
                distanceInKm: Number(distance.toFixed(2)),
            };
        });

        // Sort by nearest distance
        schoolsWithDistance.sort((a, b) => a.distanceInKm - b.distanceInKm);

        // Response
        res.status(200).json({
            success: true,
            count: schoolsWithDistance.length,
            data: schoolsWithDistance,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message,
        });
    }
};
