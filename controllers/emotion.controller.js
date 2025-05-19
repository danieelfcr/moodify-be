const rekognition = require('../services/rekognition');
const { DetectFacesCommand } = require('@aws-sdk/client-rekognition');

exports.detectEmotion = async (req, res) => {
    try {
        const { image_base64 } = req.body; //Obtain base64 image from user
        const image = image_base64;

        //Delete b64 header if it has it
        const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
        const buffer = Buffer.from(base64Data, 'base64');

        const params = {
            Image: {
                Bytes: buffer
            },
            Attributes: ['ALL']
        };

        const command = new DetectFacesCommand(params);

        //Using await to work properly with promises
        const data = await rekognition.send(command);

        if (data.FaceDetails.length === 0) {
            return res.status(404).json({ error: 'No face detected' });
        }

        //Obtain most probable emotion
        const emotions = data.FaceDetails[0].Emotions;
        const dominantEmotion = emotions.reduce((prev, current) =>
            prev.Confidence > current.Confidence ? prev : current
        );

        res.json({
            emotion: dominantEmotion.Type,
            confidence: dominantEmotion.Confidence
        });
        
    } catch (error) {
        console.error("Error in server:", error);
        res.status(500).json({ error: 'Error in server', detail: error.message });
    }
};


exports.registerTransaction = async (req, res) => {
    
}
