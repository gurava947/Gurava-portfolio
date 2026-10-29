import unittest

from support import run_solution


class WelcomeMessageTest(unittest.TestCase):
    def test_case_01_one_name(self):
        """one name."""
        result = run_solution('welcome-message', 'Guravaiah\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Welcome Guravaiah\n')

    def test_case_02_another_name(self):
        """another name."""
        result = run_solution('welcome-message', 'Practice\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Welcome Practice\n')


if __name__ == "__main__":
    unittest.main()
