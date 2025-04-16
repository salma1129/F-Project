const Application = require('../models/Application');
const multer = require('multer');
const path = require('path');

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: function (req, file, cb) {
        const filetypes = /pdf|doc|docx/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Only PDF and Word documents are allowed'));
    }
}).single('cv');

const submitApplication = async (req, res) => {
    try {
        upload(req, res, async function(err) {
            if (err instanceof multer.MulterError) {
                return res.status(400).json({
                    success: false,
                    message: 'File upload error',
                    error: err.message
                });
            } else if (err) {
                return res.status(400).json({
                    success: false,
                    message: 'Error processing file',
                    error: err.message
                });
            }

            const { name, email } = req.body;
            const cvPath = req.file ? req.file.path : null;

            if (!cvPath) {
                return res.status(400).json({
                    success: false,
                    message: 'CV file is required'
                });
            }

            const application = new Application({
                name,
                email,
                cvPath
            });

            await application.save();

            res.status(201).json({
                success: true,
                message: 'Application submitted successfully',
                data: application
            });
        });
    } catch (error) {
        console.error('Error submitting application:', error);
        res.status(500).json({
            success: false,
            message: 'Error processing application',
            error: error.message
        });
    }
};

const getApplications = async (req, res) => {
    try {
        const applications = await Application.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            data: applications
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching applications',
            error: error.message
        });
    }
};

module.exports = {
    submitApplication,
    getApplications
}; 