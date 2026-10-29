import unittest

from support import run_solution


class SecondCharacterInTheWordTest(unittest.TestCase):
    def test_case_01_ractice(self):
        """Practice."""
        result = run_solution('second-character-in-the-word', 'Practice\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'r\n')

    def test_case_02_ello(self):
        """Hello."""
        result = run_solution('second-character-in-the-word', 'Hello\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'e\n')


if __name__ == "__main__":
    unittest.main()
