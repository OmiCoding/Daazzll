import {
  loginPass,
  validEmail,
  validName,
  validPass,
  validPhone,
  validUser,
} from "../authValidation";

test("checking validEmail works with valid email.", () => {
  const email = "johndoe123@gmail.com";

  const mockEmailFn = jest.fn(validEmail);

  mockEmailFn(email);

  expect(mockEmailFn).toHaveReturnedWith(false);
});

test("checking validEmail doesn't allow empty emails", () => {
  const email = "";

  const mockEmailFn = jest.fn(validEmail);

  mockEmailFn(email);

  expect(mockEmailFn).toHaveReturnedWith("Please give us your email.");
});

test("checking validName passes with valid credentials.", () => {
  const name = "john";

  const mockNameFn = jest.fn(validName);

  mockNameFn(name);

  expect(mockNameFn).toHaveReturnedWith(false);
});

test("checking validName fails with whitespace.", () => {
  const name = "j ohn";

  const mockNameFn = jest.fn(validName);

  mockNameFn(name);

  expect(mockNameFn).toHaveReturnedWith("No whitespace characters allowed.");
});

test("checking validName fails with long name.", () => {
  const name =
    "uageofaygdfiyawgepfaigfpsaidfgsadufgpasefagfpauegfpasufgdsaufgpsaufgpeaufgsaofgsadfgasdifgaspidfgsadiufgsadpifugapdsifuagdspfiaugfpadugfpadsfugdasufgaspdfagdfaugfpaufgapugfauisgfausdfgapiufgpasdugfasdgfauipsdgfpaisdgfaiudgfpaidgfasudgfpaudfgaidfpafdgaidufgaiudfgaiudfgaiudsgfaiudsgfaspdfapugfpadgfpadugfadgfpiadgfpadgfpaidfgpadfgadugfpadgfpadfgapifdugapdsfuasdfgpaisdfgpaidsfgasudfgadpfugasdfuagsdfpiuasifadfpaisudfgapsdiufgasdiufgapdsfiuagdsfpaisdfguapsgf";

  const mockNameFn = jest.fn(validName);

  mockNameFn(name);

  expect(mockNameFn).toHaveReturnedWith("Name is too long.");
});

test("checking validName fails with an empty string.", () => {
  const name = "";

  const mockNameFn = jest.fn(validName);

  mockNameFn(name);

  expect(mockNameFn).toHaveReturnedWith("Please fill in a name.");
});

test("checking validName fails with special characters", () => {
  const name = ";,.!@#$%^&*()+-|}{[]<>?:\"'";

  const mockNameFn = jest.fn(validName);

  for (let i = 0; i < name.length; i++) {
    mockNameFn(name[i]);
    expect(mockNameFn).toHaveReturnedWith(
      "No special characters allowed.\n Ex: @#$%^!&*"
    );
  }
});

test("checking validPhone passes with valid credentials.", () => {
  const phone = "347-151-2142";

  const mockPhoneFn = jest.fn(validPhone);

  mockPhoneFn(phone);

  expect(mockPhoneFn).toHaveReturnedWith(false);
});

test("checking validPhone fails when phone number is too long.", () => {
  const phone = "347-151-21424";

  const mockPhoneFn = jest.fn(validPhone);

  mockPhoneFn(phone);

  expect(mockPhoneFn).toHaveReturnedWith("Please put in a valid phone number.");
});

test("checking validPhone fails with invalid characters.", () => {
  const phone = "34e-151-2142";

  const mockPhoneFn = jest.fn(validPhone);

  mockPhoneFn(phone);

  expect(mockPhoneFn).toHaveReturnedWith("Please put in a valid phone number.");
});

test("checking validPass works with valid credentials", () => {
  const pass = "johndoe123";
  const confirmPass = "johndoe123";

  const mockPassFn = jest.fn(validPass);

  mockPassFn(pass, confirmPass);

  expect(mockPassFn).toHaveReturnedWith(false);
});

test("checking validPass fails with empty strings.", () => {
  const pass = "";
  const confirmPass = "";

  const mockPassFn = jest.fn(validPass);

  mockPassFn(pass, confirmPass);

  expect(mockPassFn).toHaveReturnedWith("Can not have an empty pass field.");
});

test("checking validPass fails with unequal length pass strings.", () => {
  const pass = "johndoe1234";
  const confirmPass = "johndoe123";

  const mockPassFn = jest.fn(validPass);

  mockPassFn(pass, confirmPass);

  expect(mockPassFn).toHaveReturnedWith("Passwords do not match.");
});

test("checking validPass fails with less than 8 characters.", () => {
  const pass = "johndoe";
  const confirmPass = "johndoe";

  const mockPassFn = jest.fn(validPass);

  mockPassFn(pass, confirmPass);

  expect(mockPassFn).toHaveReturnedWith(
    "Password length is too short. Minumum length is 8 characters."
  );
});

test("checking validPass fails with un-matching pass strings.", () => {
  const pass = "j0hndoe123";
  const confirmPass = "johndoe123";

  const mockPassFn = jest.fn(validPass);

  mockPassFn(pass, confirmPass);

  expect(mockPassFn).toHaveReturnedWith("Passwords do not match.");
});

test("checking validPass fails with un-matching pass strings.", () => {
  const pass = "j0hndoe123";
  const confirmPass = "johndoe123";

  const mockPassFn = jest.fn(validPass);

  mockPassFn(pass, confirmPass);

  expect(mockPassFn).toHaveReturnedWith("Passwords do not match.");
});

test("checking validPass fails with whitespace in pass strings.", () => {
  const pass = "jo hndoe123";
  const confirmPass = "jo hndoe123";

  const mockPassFn = jest.fn(validPass);

  mockPassFn(pass, confirmPass);

  expect(mockPassFn).toHaveReturnedWith("No white space allowed.");
});

test("checking validPass fails with too long pass length", () => {
  const pass =
    "uageofaygdfiyawgepfaigfpsaidfgsadufgpasefagfpauegfpasufgdsaufgpsaufgpeaufgsaofgsadfgasdifgaspidfgsadiufgsadpifugapdsifuagdspfiaugfpadugfpadsfugdasufgaspdfagdfaugfpaufgapugfauisgfausdfgapiufgpasdugfasdgfauipsdgfpaisdgfaiudgfpaidgfasudgfpaudfgaidfpafdgaidufgaiudfgaiudfgaiudsgfaiudsgfaspdfapugfpadgfpadugfadgfpiadgfpadgfpaidfgpadfgadugfpadgfpadfgapifdugapdsfuasdfgpaisdfgpaidsfgasudfgadpfugasdfuagsdfpiuasifadfpaisudfgapsdiufgasdiufgapdsfiuagdsfpaisdfguapsgf";
  const confirmPass =
    "uageofaygdfiyawgepfaigfpsaidfgsadufgpasefagfpauegfpasufgdsaufgpsaufgpeaufgsaofgsadfgasdifgaspidfgsadiufgsadpifugapdsifuagdspfiaugfpadugfpadsfugdasufgaspdfagdfaugfpaufgapugfauisgfausdfgapiufgpasdugfasdgfauipsdgfpaisdgfaiudgfpaidgfasudgfpaudfgaidfpafdgaidufgaiudfgaiudfgaiudsgfaiudsgfaspdfapugfpadgfpadugfadgfpiadgfpadgfpaidfgpadfgadugfpadgfpadfgapifdugapdsfuasdfgpaisdfgpaidsfgasudfgadpfugasdfuagsdfpiuasifadfpaisudfgapsdiufgasdiufgapdsfiuagdsfpaisdfguapsgf";

  const mockPassFn = jest.fn(validPass);

  mockPassFn(pass, confirmPass);

  expect(mockPassFn).toHaveReturnedWith("Password is too long.");
});

test("checking validUser passes with valid credentials.", () => {
  const username = "johndoe12";

  const mockUserFn = jest.fn(validUser);

  mockUserFn(username);

  expect(mockUserFn).toHaveReturnedWith(false);
});

test("checking validUser fails with whitespace characters in name.", () => {
  const username = "j ohndoe123";

  const mockUserFn = jest.fn(validUser);

  mockUserFn(username);

  expect(mockUserFn).toHaveReturnedWith("No whitespace characters allowed.");
});

test("checking validUser fails with long a name.", () => {
  const username =
    "uageofaygdfiyawgepfaigfpsaidfgsadufgpasefagfpauegfpasufgdsaufgpsaufgpeaufgsaofgsadfgasdifgaspidfgsadiufgsadpifugapdsifuagdspfiaugfpadugfpadsfugdasufgaspdfagdfaugfpaufgapugfauisgfausdfgapiufgpasdugfasdgfauipsdgfpaisdgfaiudgfpaidgfasudgfpaudfgaidfpafdgaidufgaiudfgaiudfgaiudsgfaiudsgfaspdfapugfpadgfpadugfadgfpiadgfpadgfpaidfgpadfgadugfpadgfpadfgapifdugapdsfuasdfgpaisdfgpaidsfgasudfgadpfugasdfuagsdfpiuasifadfpaisudfgapsdiufgasdiufgapdsfiuagdsfpaisdfguapsgf";

  const mockUserFn = jest.fn(validUser);

  mockUserFn(username);

  expect(mockUserFn).toHaveReturnedWith(
    "This username has exceeded the limit of characters."
  );
});

test("checking validUser fails with special characters in name.", () => {
  const username = "j$#ohndoe123";

  const mockUserFn = jest.fn(validUser);

  mockUserFn(username);

  expect(mockUserFn).toHaveReturnedWith(
    "No special characters are allowed. Ex: @#!$%^&*()"
  );
});

test("Checking loginPass passes with valid credentials.", () => {
  const pass = "johndoe123!";

  const mockPassFn = jest.fn(loginPass);

  mockPassFn(pass);

  expect(mockPassFn).toHaveReturnedWith(false);
});

test("Checking loginPass fails with no password.", () => {
  const pass = "";

  const mockPassFn = jest.fn(loginPass);

  mockPassFn(pass);

  expect(mockPassFn).toHaveReturnedWith("Please enter a password.");
});

test("Checking loginPass fails with short password.", () => {
  const pass = "johndoe";

  const mockPassFn = jest.fn(loginPass);

  mockPassFn(pass);

  expect(mockPassFn).toHaveReturnedWith(
    "Password length is too short. Minumum length is 8 characters."
  );
});

test("Checking the loginPass that it fails with an empty string.", () => {
  const pass = "";

  const mockPassFn = jest.fn(loginPass);

  mockPassFn(pass);

  expect(mockPassFn).toHaveReturnedWith("Please enter a password.");
});

test("Checking the loginPass that it fails with whitespace characters", () => {
  const pass = "johndoe123 !";

  const mockPassFn = jest.fn(loginPass);

  mockPassFn(pass);

  expect(mockPassFn).toHaveReturnedWith("No white space allowed.");
});

test("Checking the loginPass that it fails with a long password.", () => {
  const pass =
    "uageofaygdfiyawgepfaigfpsaidfgsadufgpasefagfpauegfpasufgdsaufgpsaufgpeaufgsaofgsadfgasdifgaspidfgsadiufgsadpifugapdsifuagdspfiaugfpadugfpadsfugdasufgaspdfagdfaugfpaufgapugfauisgfausdfgapiufgpasdugfasdgfauipsdgfpaisdgfaiudgfpaidgfasudgfpaudfgaidfpafdgaidufgaiudfgaiudfgaiudsgfaiudsgfaspdfapugfpadgfpadugfadgfpiadgfpadgfpaidfgpadfgadugfpadgfpadfgapifdugapdsfuasdfgpaisdfgpaidsfgasudfgadpfugasdfuagsdfpiuasifadfpaisudfgapsdiufgasdiufgapdsfiuagdsfpaisdfguapsgf";

  const mockPassFn = jest.fn(loginPass);

  mockPassFn(pass);

  expect(mockPassFn).toHaveReturnedWith("Password is too long.");
});
