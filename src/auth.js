import cookie from "cookie";
import CryptoJS from "crypto-js";
import config from "./config";

const decryptToken = () => {
	if (document.cookie)
		return CryptoJS.AES.decrypt(
			cookie.parse(document.cookie)["authCookie"],
			config.key
		);
	return false;
};

// Takes in response object from /login
export function encryptToken(data) {
	return CryptoJS.AES.encrypt(JSON.stringify(data),config.key);

}

export function isLoggedIn() {
	if (decryptToken()) return true;
	return false;
}

export function getAuthUsername() {
	const decryptedToken = decryptToken();

	if(decryptedToken){
		const tokenData = JSON.parse(decryptedToken.toString(CryptoJS.enc.Utf8));
		return tokenData.username;
	}
	return null;
}

export function getAuthName() {
	const decryptedToken = decryptToken();

	if(decryptedToken){
		const tokenData = JSON.parse(decryptedToken.toString(CryptoJS.enc.Utf8));
		return tokenData.fname + " " + tokenData.lname;
	}
	return null;
}

export function getAuthEmail() {
	const decryptedToken = decryptToken();

	if(decryptedToken){
		const tokenData = JSON.parse(decryptedToken.toString(CryptoJS.enc.Utf8));
		return tokenData.email;
	}
	return null;
}

export function getAuthMobile() {
	const decryptedToken = decryptToken();

	if(decryptedToken){
		const tokenData = JSON.parse(decryptedToken.toString(CryptoJS.enc.Utf8));
		return tokenData.contactNum;
	}
	return null;
}

export function getAuthType() {
	const decryptedToken = decryptToken();

	if(decryptedToken){
		const tokenData = JSON.parse(decryptedToken.toString(CryptoJS.enc.Utf8));
		return tokenData.userType;
	}
	return null;
}

export function getAuthId() {
	const decryptedToken = decryptToken();

	if(decryptedToken){
		const tokenData = JSON.parse(decryptedToken.toString(CryptoJS.enc.Utf8));
		return tokenData.userId;
	}
	return null;
}
