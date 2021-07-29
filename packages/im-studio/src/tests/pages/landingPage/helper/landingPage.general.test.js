import chai, {expect} from "chai";
import { getVideoIdFromURL } from "../../../../pages/landingPage/helper/landingPage.general";

describe("Testin 'getVideoIdFromURL'", () => {
    describe("when valid URL", () => {
        it("should return valid id ", () => {
            const url = "https://www.youtube.com/watch?v=KVh4KtUSW3A"
            const videoId = getVideoIdFromURL(url);
            const expectedVideoId = "KVh4KtUSW3A"
            expect(videoId).to.eql(expectedVideoId);
         });
    })
    
    chai.use(chaiEnzyme());
 });