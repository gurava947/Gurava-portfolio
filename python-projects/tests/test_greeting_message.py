import unittest

from support import run_solution


class GreetingMessageTest(unittest.TestCase):
    def test_case_01_8_is_morning(self):
        """8 is morning."""
        result = run_solution('greeting-message', '8\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Good Morning\n')

    def test_case_02_14_is_afternoon(self):
        """14 is afternoon."""
        result = run_solution('greeting-message', '14\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Good Afternoon\n')

    def test_case_03_18_is_evening(self):
        """18 is evening."""
        result = run_solution('greeting-message', '18\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Good Evening\n')

    def test_case_04_22_is_night(self):
        """22 is night."""
        result = run_solution('greeting-message', '22\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Good Night\n')


if __name__ == "__main__":
    unittest.main()
